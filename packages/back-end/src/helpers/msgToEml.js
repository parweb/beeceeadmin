const fs = require('fs');
const spawn = require('await-spawn');
const detectCharacterEncoding = require('detect-character-encoding');

const msgToEml = async (input, output) => {
  try {
    await spawn('msgconvert', [input, '--mbox', output]);
    const { encoding } = detectCharacterEncoding(fs.readFileSync(output));

    console.log({ encoding });

    const file = fs.readFileSync(
      output,
      { 'windows-1252': 'latin1' }[encoding] ?? undefined
    );

    fs.writeFileSync(
      output,
      file.toString().replaceAll(/charset=iso-8859-1/gi, 'charset=UTF-8'),
      'utf8'
    );

    return { input, output };
  } catch (e) {
    console.log(e);
    return null;
  }
};

module.exports = msgToEml;
