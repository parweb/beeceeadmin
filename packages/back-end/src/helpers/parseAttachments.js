const fs = require('fs');
const md5 = require('md5');
const iconvLite = require('iconv-lite');
const { default: bufferToDataUrl } = require('buffer-to-data-url');

const keepAttachments = require('./keepAttachments');
const keepRtfFile = require('./keepRtfFile');
const rtfToHtml = require('./rtfToHtml');

const path = process.env.PATH_TMP || '/app/tmp/';
const apiPreview = process.env.API_PREVIEW;

const parseAttachments = async attachments => {
  const rtf = attachments.find(keepRtfFile);

  const cids = attachments
    .filter(keepAttachments)
    .map(({ content, contentType, cid }) => ({
      name: `cid:${cid}`,
      data: bufferToDataUrl(contentType, content)
    }));

  console.log({ rtf, cids });

  if (rtf) {
    const rtf_path = path + rtf.checksum + '.rtf';
    fs.writeFileSync(rtf_path, rtf.content);

    const rtf2html = await rtfToHtml(rtf_path);

    console.log({ rtf2html });
    console.log({ attachments });

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

    const htmlDecoded = cids.reduce(
      (carry, { name, data }) => carry.replaceAll(name, data),
      rtf2html.text
    );

    const urlHtml = `${apiPreview}/attachment/?file=${rtf.checksum}.html`;
    const fileHtmlPath = path + md5(urlHtml);

    const html_path = fileHtmlPath;
    fs.writeFileSync(html_path, htmlDecoded);

    return urlHtml;
  }

  return null;
};

module.exports = parseAttachments;
