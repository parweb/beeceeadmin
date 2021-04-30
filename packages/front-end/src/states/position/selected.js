import { selector } from 'recoil';

import { $position, $value } from 'states';

const selected = selector({
  key: 'position.selected',
  get: ({ get }) => {
    const id = get($value('positionsSelected'));
    return id === null
      ? get($position.list)?.find(({ name }) => name === 'intégration')?.id ??
          null
      : id;
  },
  set: ({ set }, value) => set($value('positionsSelected'), value)
});

export default selected;
