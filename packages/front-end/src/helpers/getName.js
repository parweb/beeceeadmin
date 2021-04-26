import { qualificationsById } from 'state/qualifications';

const getName = (typeDocument, code) => {
  const code_trimed = code ? code.trim() : code;
  const type = typeDocument === 'PHO' ? 'photo' : 'document';
  const qualifications = qualificationsById(type);

  const fallback = {
    document: 'DIV',
    photo: 'AUTR'
  };

  const label = qualifications[code_trimed] ?? qualifications[fallback[type]];
  const id = qualifications[code_trimed] ? code_trimed : fallback[type];

  return { label, id };
};

export default getName;
