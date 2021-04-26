const handleMEL = require('./handleMEL');
const handleDEFAULT = require('./handleDEFAULT');

const types = {
  eml: handleMEL,
  msg: handleMEL,
  DEFAULT: handleDEFAULT
};

const format = input => input.split('.').reverse()[0].toLowerCase();

const handleDocument = document => {
  const type = format(document.externalUrl);
  console.log({ idDocNum: document.idDocNum, type });
  return types[type] ? types[type](document) : types.DEFAULT(document);
};

module.exports = handleDocument;
