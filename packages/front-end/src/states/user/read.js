import { selectorFamily } from 'recoil';

import { $user } from 'states';

const read = selectorFamily({
  key: 'user.read',
  get:
    id =>
    ({ get }) =>
      get($user.list)?.find(user => user.id === id)
});

export default read;
