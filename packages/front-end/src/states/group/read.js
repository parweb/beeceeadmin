import { selectorFamily } from 'recoil';

import { $group } from 'states';

const read = selectorFamily({
  key: 'group.read',
  get: id => ({ get }) => get($group.list).find(group => group.id === id)
});

export default read;
