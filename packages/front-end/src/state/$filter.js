import { selector } from 'recoil';

import { $filters, $mission } from 'state';

const persistFilter = (mission, filters) => {
  localStorage.setItem('filters-' + mission, JSON.stringify(filters));
  return filters;
};

const $filter = selector({
  key: 'filter',
  get: ({ get }) => {
    const mission = get($mission);
    return get($filters(mission));
  },
  set: ({ set, get }, current) => {
    const mission = get($mission);

    if (current.type === 'photoName') {
      set($filters(mission), state =>
        persistFilter(mission, [
          ...state.filter(({ type }) => type !== 'photoName'),
          current
        ])
      );
      return;
    }

    if (current.type === 'documentName') {
      set($filters(mission), state =>
        persistFilter(mission, [
          ...state.filter(({ type }) => type !== 'documentName'),
          current
        ])
      );
      return;
    }

    const filters = get($filters(mission));
    const isAlreadyThere = filters.some(
      ({ type, value }) => type === current.type && value === current.value
    );

    if (isAlreadyThere === true) {
      set($filters(mission), state =>
        persistFilter(
          mission,
          state.filter(
            ({ type, value }) =>
              !(type === current.type && value === current.value)
          )
        )
      );
    } else {
      set($filters(mission), state =>
        persistFilter(mission, [...state, current])
      );
    }
  }
});

export default $filter;
