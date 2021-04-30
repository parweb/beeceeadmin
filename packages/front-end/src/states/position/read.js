import { selectorFamily } from 'recoil';

import { $position } from 'states';

const read = selectorFamily({
  key: 'position.read',
  get: code => ({ get }) =>
    get($position.list)?.find(position => position.code === String(code)) ?? {}
});

export default read;
