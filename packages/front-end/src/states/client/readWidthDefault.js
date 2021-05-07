import { selectorFamily } from 'recoil';

import { $client } from 'states';

const readWidthDefault = selectorFamily({
  key: 'client.readWidthDefault',
  get: id => ({ get }) =>
    get($client.listWidthDefault)?.find(client => client.id === id) ?? {}
});

export default readWidthDefault;
