const excludeEmbededAttachments = html => ({ cid = null }) => {
  if (cid === null) {
    return true;
  }

  if (html === false) {
    return true;
  }

  const [name] = cid.split('@');
  const term = `cid:${name}`;

  return !html?.includes(term) ?? true;
};

module.exports = excludeEmbededAttachments;
