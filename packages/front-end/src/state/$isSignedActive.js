import { selector } from 'recoil';

import { $filter } from 'state';

const $isSignedActive = selector({
  key: 'isSignedActive',
  get: ({ get }) =>
    get($filter).some(({ type, value }) => type === 'signed' && value === true)
});

export default $isSignedActive;
