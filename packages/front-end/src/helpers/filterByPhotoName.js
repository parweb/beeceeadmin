import { qualificationsById } from 'state/qualifications';

const filterByPhotoName = filter => ({ codeQualification, typeDocument }) => {
  const codes = filter.reduce((carry, { id }) => [...carry, id], []);

  if (codes.includes('AUTR') && typeDocument === 'PHO') {
    if (!qualificationsById('photo')[codeQualification]) {
      return true;
    }
  }

  return (
    filter.length === 0 ||
    (typeDocument === 'PHO' && codes.includes(codeQualification))
  );
};

export default filterByPhotoName;
