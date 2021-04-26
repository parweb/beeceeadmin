const handleDEFAULT = document => {
  return {
    ...document,
    preview: `${process.env.API_PREVIEW}/image/?url=${document.externalUrl}`,
    attachments: []
  };
};

module.exports = handleDEFAULT;
