import { selectorFamily } from 'recoil';

import { $client } from 'states';

const read = selectorFamily({
  key: 'client.read',
  get: id => ({ get }) => get($client.list).find(client => client.id === id)
});

export default read;
