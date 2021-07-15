import { selectorFamily } from 'recoil';

import { $role } from 'states';

const read = selectorFamily({
  key: 'role.read',
  get:
    id =>
    ({ get }) =>
      get($role.list).find(role => role.id === id)
});

export default read;
