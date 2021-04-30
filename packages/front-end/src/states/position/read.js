import { selectorFamily } from 'recoil';

import { $position } from 'states';

const read = selectorFamily({
  key: 'position.read',
  get: codeCourrier => ({ get }) =>
    get($position.list)?.find(
      position => position.codeCourrier === String(codeCourrier)
    ) ?? {}
});

export default read;
