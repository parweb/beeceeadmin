import { selector } from 'recoil';

import { $roleSelected } from 'state';

const $isRoleValid = selector({
  key: 'isRoleValid',
  get: ({ get }) => {
    const role = get($roleSelected);

    return role.length > 0;
  }
});

export default $isRoleValid;
