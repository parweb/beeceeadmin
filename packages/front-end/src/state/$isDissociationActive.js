import { selector } from 'recoil';

import { $filter } from 'state';

const $isDissociationActive = selector({
  key: 'isDissociationActive',
  get: ({ get }) =>
    get($filter).some(
      ({ type, value }) => type === 'dissociation' && value === true
    )
});

export default $isDissociationActive;
