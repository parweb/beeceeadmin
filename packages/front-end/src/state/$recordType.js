import { selector, waitForAll, atomFamily } from 'recoil';

import { $documents } from 'state';
import { getRecordType } from 'services/signature';

const $recordTypeByDossier = atomFamily({
  key: 'recordTypeByDossier',
  default: async dossierId => {
    if (dossierId === '') return undefined;
    return await getRecordType({ dossierId });
  }
});

const $recordType = selector({
  key: 'recordtype',
  get: async ({ get }) => {
    const [[{ numDos = null } = {}] = []] = get(waitForAll([$documents])) ?? [];

    if (numDos === null) {
      return null;
    }

    const recordType = get($recordTypeByDossier(numDos));

    const mapperRecordType = {
      Dossier: 'XPS',
      DossierGestionGE: 'GE',
      DossierFerme: 'GE-close',
      Reclamation: 'reclamation',
      ReclamationFermee: 'reclamation-close',
      GE: 'GE',
      null: 'XPS'
    };

    const record =
      mapperRecordType[recordType?.trim() ?? null] ?? mapperRecordType[null];

    return record;
  }
});

export default $recordType;
