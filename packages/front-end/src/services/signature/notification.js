import axios from 'axios';
import { format } from 'date-fns';

import { getName } from 'helpers';

const notification = async ({ documents = [], status, role }) => {
  try {
    return Promise.all(
      documents.map(
        ({
          numDos,
          nomFichier,
          externalUrl,
          typeDocument,
          codeQualification,
          idDocNum
        }) =>
          axios.post(`${process.env.REACT_APP_API}/document/notification`, {
            numDossier: numDos,
            docId: `par ${role.Name} - ${role.Role} - ${
              getName(typeDocument, codeQualification).label
            } - n° ${idDocNum}`,
            docUrl: externalUrl,
            requestStatus: status,
            requestDate: format(new Date(), 'yyyy-MM-dd_HH:mm:ss').replace(
              '_',
              'T'
            )
          })
      )
    );
  } catch (_) {
    return null;
  }
};

export default notification;
