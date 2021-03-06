import { selector, atomFamily } from 'recoil';

import { $service } from 'states';
import { allExtensions } from 'services';

const $proxy = atomFamily({
  key: 'extension.list.proxy',
  default: url => allExtensions(url)
});

const list = selector({
  key: 'extension.list',
  get: ({ get }) => {
    const service = get($service.current('bca-extension-api'));
    return get($proxy(service.url));
  },
  set: ({ set, get }, value) => {
    const service = get($service.current('bca-extension-api'));
    set($proxy(service.url), value);
  }
});

export default list;
