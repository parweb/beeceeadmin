import { selectorFamily } from 'recoil';

import { $notification } from 'states';

const read = selectorFamily({
  key: 'notification.read',
  get: id => ({ get }) =>
    get($notification.list)?.find(
      notification => notification.id === String(id)
    ) ?? {}
});

export default read;
