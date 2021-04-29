import { selectorFamily } from 'recoil';

import { $courrier } from 'states';

const read = selectorFamily({
  key: 'courrier.read',
  get: id => ({ get }) =>
    get($courrier.list).find(courrier => courrier.id === id)
});

export default read;
