import { selector } from 'recoil';

import { $filters, $mission } from 'state';

const $filtersHasDocument = selector({
  key: 'filtersHasDocument',
  get: ({ get }) => {
    const mission = get($mission);
    return get($filters(mission)).some(
      ({ type, value }) => type === 'type' && value === 'others'
    );
  }
});

export default $filtersHasDocument;
