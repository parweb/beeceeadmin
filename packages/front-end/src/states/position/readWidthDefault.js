import { selectorFamily } from 'recoil';

import { $position } from 'states';

const readWidthDefault = selectorFamily({
  key: 'position.readWidthDefault',
  get: codeCourrier => ({ get }) =>
    get($position.listWidthDefault)?.find(
      position => position.codeCourrier === String(codeCourrier)
    ) ?? {}
});

export default readWidthDefault;
