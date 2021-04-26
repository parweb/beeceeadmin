const fetchAsync = require('./fetchAsync');
const excludeRelated = require('./excludeRelated');
const excludeEmbededAttachments = require('./excludeEmbededAttachments');
const excludeEmptyFilename = require('./excludeEmptyFilename');
const keepAttachments = require('./keepAttachments');
const keepRtfFile = require('./keepRtfFile');
const parseAttachments = require('./parseAttachments');

const parseEmail = document =>
  new Promise(async (success, error) => {
    try {
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

      attachments = await parseAttachments(attachments);

      success({
        email: { to, from, cc, bcc, date, subject },
        attachments: attachments
          .filter(excludeRelated)
          .filter(excludeEmbededAttachments(html))
          .filter(excludeEmptyFilename)
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

module.exports = parseEmail;
