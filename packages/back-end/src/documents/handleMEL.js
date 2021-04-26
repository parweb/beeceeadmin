const fetch = require('fetch').fetchUrl;
const fs = require('fs');
const md5 = require('md5');
const eml2png = require('eml2png');
const Iconv = require('iconv').Iconv;
const MailParser = require('mailparser').MailParser;
const simpleParser = require('mailparser').simpleParser;
const { extension } = require('mime-types');
const spawn = require('await-spawn');
const detectCharacterEncoding = require('detect-character-encoding');
const iconvLite = require('iconv-lite');
const { deEncapsulateStream } = require('rtf-stream-parser');
const { default: bufferToDataUrl } = require('buffer-to-data-url');

const format = require('../helpers/format');
const fetchAsync = require('../helpers/fetchAsync');
const msgToEml = require('../helpers/msgToEml');

const path = process.env.PATH_TMP || '/app/tmp/';
const converter = new eml2png();

const apiPreview = process.env.API_PREVIEW;

const decode = document =>
  new Promise(async (success, error) => {
    try {
      console.log({ idDocNum: document.idDocNum });
      if (format(document.externalUrl) === 'msg') {
        console.log('------------- detect msg file [START] -------------');
        const nameTmp = md5(document.idDocNum + document.externalUrl);
        console.log({ nameTmp });
        const url = `${apiPreview}/attachment/?file=${nameTmp}.eml`;
        console.log({ url });

        const fileMsgPath = path + nameTmp + '.msg';
        const fileEmlPath = path + md5(url);
        console.log({ fileMsgPath, fileEmlPath });

        if (!fs.existsSync(fileMsgPath)) {
          console.log('file: ' + fileMsgPath + ' dont exist so create it');
          const body = await fetchAsync(document.externalUrl);
          fs.writeFileSync(fileMsgPath, body);
        } else {
          console.log(
            'file: ' + fileMsgPath + ' already exist so dont recreate it'
          );
        }

        console.log('before overide', { externalUrl: document.externalUrl });

        if (!fs.existsSync(fileEmlPath)) {
          try {
            await msgToEml(fileMsgPath, fileEmlPath);
          } catch (e) {
            console.log(e);
          }
        }

        document.originUrl = document.externalUrl;
        document.externalUrl = url;

        console.log({ externalUrl: document.externalUrl, url });
        console.log(
          'after overide',
          '------------- detect msg file [FIN] -------------'
        );
      }

      console.log('handleMEL ----------------------------------------------');
      console.log({ externalUrl: document.externalUrl });
      const body = await fetchAsync(document.externalUrl);
      let {
        attachments,
        to,
        from,
        cc,
        bcc,
        date,
        subject,
        html
      } = await simpleParser(body);

      console.log({ attachments });

      const rtf = attachments.find(
        ({ contentType, contentDisposition }) =>
          contentType === 'application/rtf' && contentDisposition === 'inline'
      );

      const cids = attachments
        .filter(({ type, cid }) => type === 'attachment' && !!cid)
        .map(({ content, contentType, cid }) => ({
          name: `cid:${cid}`,
          data: bufferToDataUrl(contentType, content)
        }));

      if (rtf) {
        const rtf_path = path + rtf.checksum + '.rtf';
        fs.writeFileSync(rtf_path, rtf.content);

        const stream = fs.createReadStream(rtf_path);
        const rtf2html = await deEncapsulateStream(stream, {
          decode: iconvLite.decode
        });

        attachments = attachments.filter(
          ({ cid = null, contentType, contentDisposition }) => {
            if (
              contentType === 'application/rtf' &&
              contentDisposition === 'inline'
            ) {
              return false;
            }

            if (cid === null) {
              return true;
            }

            return !rtf2html.text?.includes(cid) ?? true;
          }
        );

        console.log('after attachments', document.idDocNum, attachments);

        const htmlDecoded = cids.reduce(
          (carry, { name, data }) => carry.replaceAll(name, data),
          rtf2html.text
        );

        const urlHtml = `${apiPreview}/attachment/?file=${rtf.checksum}.html`;
        const fileHtmlPath = path + md5(urlHtml);

        const html_path = fileHtmlPath;
        fs.writeFileSync(html_path, htmlDecoded);

        document.externalUrl = urlHtml;
      }

      success({
        email: { to, from, cc, bcc, date, subject },
        attachments: attachments
          .filter(({ related }) => related !== true)
          .filter(({ cid = null }) => {
            if (cid === null) {
              return true;
            }

            if (html === false) {
              return true;
            }

            const [name] = cid.split('@');
            const term = `cid:${name}`;

            return !html?.includes(term) ?? true;
          })
          .filter(({ filename = null }) => filename !== null)
          .map(({ filename = null, content, contentType }, i) => {
            console.log({
              contentType,
              extension: extension(contentType),
              filename
            });

            filename =
              filename ?? 'untitled.' + (extension(contentType) ?? 'untitled');

            filename = `${document.idDocNum}-${md5(
              date
            )}-${filename}.${extension(contentType)}`;

            console.log({ filename });

            const url = `${apiPreview}/attachment/?file=${md5(
              filename
            )}.${format(filename)}`;

            console.log({ url });

            const fileTmpPath = path + md5(url);

            console.log({ fileTmpPath });

            if (fs.existsSync(fileTmpPath)) {
              const { size } = fs.lstatSync(fileTmpPath);
              if (size === 0 || size === 1364) {
                fs.unlinkSync(fileTmpPath);
              }
            }

            console.log({ fileExist: !fs.existsSync(fileTmpPath) });

            if (!fs.existsSync(fileTmpPath)) {
              console.log(
                `[${i + 1}/${attachments.length}] write file: ${fileTmpPath}`
              );
              fs.writeFileSync(fileTmpPath, content);
            }

            const result = {
              filename: filename,
              contentType: contentType,
              url,
              preview: `${apiPreview}/image/?url=${url}`
            };

            console.log({ result });

            return result;
          })
      });
    } catch (e) {
      console.log('handleMEL::decode error');
      console.log(e);
      error(e);
    }
  });

const handleMEL = async document => {
  try {
    const email = await decode(document);

    return {
      ...document,
      preview: `${apiPreview}/image/?url=${document.externalUrl}`,
      email: email.email,
      attachments: email.attachments
    };
  } catch (e) {
    console.log('handleMEL error');
    console.log(e);
    throw e;
  }
};

module.exports = handleMEL;
