import { selector, atomFamily } from 'recoil';
import isEqual from 'lodash.isequal';

import { $mission, $permissions } from 'state';
import { allDocuments } from 'services/document';
import { PermissionDeny } from 'errors';
import { orderBy } from 'helpers';

let docs = [];

const $documentsByMission = atomFamily({
  key: 'documentsByMission',
  default: async missionId => {
    if (missionId === '') return undefined;

    return await allDocuments({ missionId });
  },
  effects_UNSTABLE: missionId => [
    ({ setSelf, onSet, trigger }) => {
      if (missionId !== '') {
        onSet(async state => {
          docs = await allDocuments({ missionId });
        });

        const handle = async e => {
          try {
            const documents = await allDocuments({ missionId });

            const _old = [...docs].sort(orderBy('idDocNum', 'asc'));
            const _new = [...documents].sort(orderBy('idDocNum', 'asc'));

            if (!isEqual(_old, _new)) {
              docs = documents;
              setSelf(documents);
            }
          } catch (_) {}
        };

        window.addEventListener('focus', handle);
        window.addEventListener('refresh-document', handle);

        return () => {
          window.removeEventListener('focus', handle);
          window.addEventListener('refresh-document', handle);
        };
      }
    }
  ]
});

const $documents = selector({
  key: 'documents',
  get: ({ get }) => {
    const mission = get($mission);
    const documents = get($documentsByMission(mission));

    const { CAN_DISPLAY_MISSION } = get($permissions);
    if (!CAN_DISPLAY_MISSION)
      throw new PermissionDeny(
        'CAN_DISPLAY_MISSION',
        "Vous n'avez pas les droits pour afficher les missions"
      );

    if (!documents) return documents;

    return documents;
  },
  set: ({ get, set }, value) => {
    const mission = get($mission);
    set($documentsByMission(mission), value);
  }
});

export default $documents;
