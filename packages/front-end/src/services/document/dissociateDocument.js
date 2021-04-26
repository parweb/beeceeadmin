import axios from 'axios';

const dissociateDocument = selected => {
  const documents = selected && Array.isArray(selected) ? selected : [selected];

  return Promise.all(
    documents.map(({ idDocNum, numDos }) =>
      axios.post(
        `${process.env.REACT_APP_API}/document/dissociate?numDos=${numDos}&idDocNum=${idDocNum}`
      )
    )
  );
};

export default dissociateDocument;
