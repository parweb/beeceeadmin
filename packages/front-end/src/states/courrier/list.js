import { selector, atomFamily } from 'recoil';

import { $service } from 'states';
import { allCourriers } from 'services';

const $proxy = atomFamily({
  key: 'courrier.list.proxy',
  default: url => allCourriers(url)
});

const list = selector({
  key: 'courrier.list',
  get: ({ get }) => {
    const service = get($service.current('bca-courrier-api'));
    return get($proxy(service.url));
  },
  set: ({ set, get }, value) => {
    const service = get($service.current('bca-courrier-api'));
    set($proxy(service.url), value);
  }
});

export default list;
