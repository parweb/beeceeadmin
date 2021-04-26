const keepAttachments = ({ type, cid }) => type === 'attachment' && !!cid;

module.exports = keepAttachments;
