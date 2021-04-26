const getTypeDocumentFromForm = form =>
  form?.getAll('documents')[0]?.type?.includes('image/') ? 'photo' : 'document';

export default getTypeDocumentFromForm;
