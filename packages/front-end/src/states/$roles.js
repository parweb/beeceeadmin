import { selector, atomFamily } from 'recoil';

import { getRoles } from 'services/signature';
import { $mission } from 'state';

const $rolesByMission = atomFamily({
  key: 'rolesByMission',
  default: async missionId => {
    if (missionId === '') return undefined;
    return await getRoles({ missionId });
  }
});

const $roles = selector({
  key: 'roles',
  get: ({ get }) => {
    const mission = get($mission);
    return $rolesByMission(mission);
  }
});

export default $roles;
