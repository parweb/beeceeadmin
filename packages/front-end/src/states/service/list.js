import { selector } from 'recoil';

import { $environnement } from 'states';

const list = selector({
  key: 'service.list',
  get: ({ get }) =>
    get($environnement.list)
      .map(({ services }) => services)
      .flatMap(value => value)
});

export default list;
