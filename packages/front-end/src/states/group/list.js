import { selector, atomFamily } from 'recoil';

import { $service } from 'states';
import { allGroups } from 'services';

const $proxy = atomFamily({
  key: 'group.list.proxy',
  default: url => allGroups(url)
});

const list = selector({
  key: 'group.list',
  get: ({ get }) => {
    const service = get($service.current('bca-admin-api'));
    return get($proxy(service.url));
  },
  set: ({ set, get }, value) => {
    const service = get($service.current('bca-admin-api'));
    set($proxy(service.url), value);
  }
});

export default list;
