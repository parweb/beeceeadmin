import { selector } from 'recoil';

import { $environnement, $value } from 'states';

const selected = selector({
  key: 'environnement.selected',
  get: ({ get }) => {
    const id = get($value('environnementsSelected'));
    return id === null
      ? get($environnement.list)?.find(({ name }) => name === 'intégration')
          ?.id ?? null
      : id;
  },
  set: ({ set }, value) => set($value('environnementsSelected'), value)
});

export default selected;
