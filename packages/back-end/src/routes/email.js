const fetch = require('fetch').fetchUrl;
const fs = require('fs');
const md5 = require('md5');
const { extname } = require('path');
const { contentType } = require('mime-types');
const Iconv = require('iconv').Iconv;
const MailParser = require('mailparser').MailParser;
const simpleParser = require('mailparser').simpleParser;
const pngenerator = require('pngenerator');
const iconvLite = require('iconv-lite');
const { deEncapsulateStream } = require('rtf-stream-parser');
const { default: bufferToDataUrl } = require('buffer-to-data-url');

let parser = new MailParser({ Iconv });

const path = process.env.PATH_TMP || '/app/tmp/';

const fetchAsync = input =>
  new Promise((resolv, reject) => {
    fetch(input, (error, _, body) => {
      if (error) reject(error);
      resolv(body);
    });
  });

module.exports = (app, opts, next) => {
  app.get('/email', async (request, reply) => {
    try {
      const { plop, html = false } = request.query;

      const body = await fetchAsync(plop);
      const parse = await simpleParser(body, { Iconv });

      const attachments = parse.attachments;

      const rtf = attachments.find(
        ({ contentType }) => contentType === 'application/rtf'
      );

      const cids = attachments
        .filter(({ type, cid }) => type === 'attachment' && !!cid)
        .map(({ content, contentType, cid }) => ({
          name: `cid:${cid}`,
          data: bufferToDataUrl(contentType, content)
        }));

      console.log({ cids });

      const rtf_path = '/tmp/rtf/plop.rtf';

      fs.writeFileSync(rtf_path, rtf.content);

      const stream = fs.createReadStream(rtf_path);
      deEncapsulateStream(stream, { decode: iconvLite.decode }).then(result => {
        const html = cids.reduce(
          (carry, { name, data }) => carry.replaceAll(name, data),
          result.text
        );

        reply.header('Content-Type', 'text/html; charset=utf-8').send(html);
      });

      console.log({ attachments });
    } catch (error) {
      console.error(error);
      reply
        .code(error?.response?.status ?? 500)
        .send(error?.response?.data ?? 'something went wrong');
    }
  });

  next();
};
