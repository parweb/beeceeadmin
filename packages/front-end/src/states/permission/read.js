import { selectorFamily } from 'recoil';

import { $permission } from 'states';

const read = selectorFamily({
  key: 'permission.read',
  get:
    id =>
    ({ get }) =>
      get($permission.list).find(permission => permission.id === id)
});

export default read;
