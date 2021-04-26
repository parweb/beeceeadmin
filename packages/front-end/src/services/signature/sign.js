import axios from 'axios';

import { notification } from 'services/signature';
import { getName } from 'helpers';

const sign = async ({
  missionId,
  recordType,
  roles,
  documents,
  documentsCourriers
}) => {
  if (documents.length === 0) return;

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/document/sign`,
      {
        callbackData: {
          num_dos: documents[0].numDos,
          recordtype: recordType,
          ownerId: '0051t0000045XOkAAM',
          // owner: { id: '0051t0000045XOkAAM' },
          missionId
          // role
        },
        documents: documents.map(
          ({
            nomFichier,
            codeQualification,
            externalUrl,
            typeDocument,
            idDocNum
          }) => {
            const [, ...rest] = nomFichier.split('_');
            const nomFichierFinal = 'PDF_' + rest.join('_');

            return {
              id: nomFichierFinal,
              codeCourrier: documentsCourriers[idDocNum],
              name: `${
                getName(typeDocument, codeQualification).label
              } - n° ${idDocNum}`,
              textCode: codeQualification,
              url: externalUrl
            };
          }
        ),

        signatories: roles.map(({ Email, Phone, Role, Name, Titre }, i) => ({
          rank: i + 1,
          email: Email,
          firstname: Titre,
          lastname: Name,
          role: Role,
          tel: Phone.startsWith('+') ? Phone : '+33' + Phone
        }))
      }
    );

    if (data?.requestId === null) {
      throw Error('requestId not found');
    }

    if (recordType === 'XPS') {
      roles.forEach(async role => {
        await notification({ documents, status: 'succès', role });
      });
    }

    return data;
  } catch (e) {
    if (recordType === 'XPS') {
      roles.forEach(async role => {
        await notification({ documents, status: 'erreur', role });
      });
    }
    return null;
  }
};

export default sign;
