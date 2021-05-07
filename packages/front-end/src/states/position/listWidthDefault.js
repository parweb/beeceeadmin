import { selector } from 'recoil';

import { $client } from 'states';

const listWidthDefault = selector({
  key: 'position.listWidthDefault',
  get: ({ get }) =>
    get($client.listWidthDefault)
      .map(({ signPositions }) => signPositions)
      .flatMap(value => value)
});

export default listWidthDefault;
