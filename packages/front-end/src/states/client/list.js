import { selector, atomFamily } from 'recoil';

import { $service } from 'states';
import { allClients } from 'services';

const $proxy = atomFamily({
  key: 'client.list.proxy',
  default: service => allClients(service)
});

const list = selector({
  key: 'client.list',
  get: ({ get }) => {
    const service = get($service.current('bca-admin-api'));
    return get($proxy(service));
  },
  set: ({ set, get }, value) => {
    const service = get($service.current('bca-admin-api'));
    set($proxy(service), value);
  }
});

export default list;
