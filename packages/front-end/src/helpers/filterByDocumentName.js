import { qualificationsById } from 'state/qualifications';

const filterByDocumentName = filter => ({
  codeQualification,
  typeDocument
}) => {
  const codes = filter.reduce((carry, { id }) => [...carry, id], []);

  if (codes.includes('DIV') && typeDocument !== 'PHO') {
    if (!qualificationsById('document')[codeQualification]) {
      return true;
    }
  }

  return (
    filter.length === 0 ||
    (typeDocument !== 'PHO' &&
      filter
        .reduce((carry, { id }) => [...carry, id], [])
        .includes(codeQualification))
  );
};

export default filterByDocumentName;
