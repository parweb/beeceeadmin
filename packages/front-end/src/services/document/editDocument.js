import axios from 'axios';

const editDocument = async ({
  typeDocument,
  idDocNum,
  numDos,
  codeQualification,
  photoAO,
  photo418,
  photoRapport,
  ...props
}) => {
  if (typeDocument === 'PHO') {
    await axios.patch(`${process.env.REACT_APP_API}/document/photo`, {
      idDocNum,
      numDos,
      codeQualification,
      photoAO,
      photo418,
      photoRapport
    });
  } else {
    await axios.patch(`${process.env.REACT_APP_API}/document/document`, {
      idDocNum,
      numDos,
      codeQualification
    });
  }
};

export default editDocument;
