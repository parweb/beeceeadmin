import { selector } from 'recoil';

import { $client } from 'states';

const list = selector({
  key: 'position.list',
  get: ({ get }) =>
    get($client.list)
      .map(({ signPositions }) => signPositions)
      .flatMap(value => value)
});

export default list;
