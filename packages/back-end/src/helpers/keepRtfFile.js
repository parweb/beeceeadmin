const keepRtfFile = ({ contentType, contentDisposition }) =>
  contentType === 'application/rtf' && contentDisposition === 'inline';

module.exports = keepRtfFile;
