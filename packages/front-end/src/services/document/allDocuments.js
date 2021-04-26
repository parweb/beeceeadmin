import axios from 'axios';

import { format } from 'helpers';

const allDocuments = async ({ missionId, last = false }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/documents/?id=${missionId}${
        last ? '&last=true' : ''
      }`
    );

    return data.map(document => {
      const isSigned = document.nomFichier.includes('_signed.pdf');

      const signedAt = isSigned
        ? new Date(
            parseInt(
              document.nomFichier
                .replace('_signed.pdf', '')
                .split('_')
                .reverse()[0]
            )
          )
        : null;

      return {
        ...document,
        signed: isSigned,
        signedAt,
        signable: format(document.externalUrl) === 'pdf',
        codeQualification: document?.codeQualification?.trim()
          ? document?.codeQualification?.trim()
          : document.typeDocument === 'PHO'
          ? 'AUTR'
          : 'DIV'
      };
    });
  } catch (_) {
    return null;
  }
};

export default allDocuments;
