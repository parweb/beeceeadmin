import { selector } from 'recoil';

import { $client } from 'states';

const list = selector({
  key: 'position.list',
  get: ({ get }) =>
    get($client.list)
      .map(({ callbackChannels }) => callbackChannels)
      .flatMap(value => value)
});

export default list;
