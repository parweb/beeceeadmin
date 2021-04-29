import { selectorFamily } from 'recoil';

import { $service } from 'states';

const read = selectorFamily({
  key: 'service.read',
  get: id => ({ get }) => {
    return get($service.list).find(service => service.id === Number(id));
  }
});

export default read;
