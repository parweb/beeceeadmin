import { selector } from 'recoil';

import { $client } from 'states';

const list = selector({
  key: 'notification.list',
  get: ({ get }) =>
    get($client.list)
      .map(({ callbackChannels }) => callbackChannels)
      .flatMap(value => value)
});

export default list;
