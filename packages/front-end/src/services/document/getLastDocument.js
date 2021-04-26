import { allDocuments } from 'services/document';

const getLastDocument = async ({
  missionId,
  previousDocuments,
  documentsUploaded
}) => {
  const getLast = () => allDocuments({ missionId, last: true });

  let currentDocuments = await getLast();

  let i = 0;
  while (
    !(
      currentDocuments.length >=
      previousDocuments.length + documentsUploaded.length
    )
  ) {
    currentDocuments = await getLast();

    if (i > 30) {
      throw new Error('max retries');
    }

    i++;
  }

  return currentDocuments.filter(
    document =>
      !previousDocuments
        .map(previous => previous.idDocNum)
        .includes(document.idDocNum)
  );
};

export default getLastDocument;
