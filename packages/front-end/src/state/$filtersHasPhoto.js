import { selector } from 'recoil';

import { $filters, $mission } from 'state';

const $filtersHasPhoto = selector({
  key: 'filtersHasPhoto',
  get: ({ get }) => {
    const mission = get($mission);
    return get($filters(mission)).some(
      ({ type, value }) => type === 'type' && value === 'photos'
    );
  }
});

export default $filtersHasPhoto;
