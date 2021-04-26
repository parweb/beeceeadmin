const fs = require('fs');
const spawn = require('await-spawn');
const iconvLite = require('iconv-lite');
const { deEncapsulateStream } = require('rtf-stream-parser');
const detectCharacterEncoding = require('detect-character-encoding');

const rtfToHtml = async input => {
  try {
    const stream = fs.createReadStream(input);
    const html = await deEncapsulateStream(stream, {
      decode: iconvLite.decode
    });

    return html;
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = rtfToHtml;
