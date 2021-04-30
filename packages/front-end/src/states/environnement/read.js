import { selectorFamily } from 'recoil';

import { $environnement } from 'states';

const read = selectorFamily({
  key: 'environnement.read',
  get: id => ({ get }) =>
    get($environnement.list)?.find(
      environnement => environnement.id === Number(id)
    ) ?? {}
});

export default read;
