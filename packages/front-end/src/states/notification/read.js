import { selectorFamily } from 'recoil';

import { $notification } from 'states';

const read = selectorFamily({
  key: 'notification.read',
  get: code => ({ get }) =>
    get($notification.list)?.find(
      notification => notification.code === String(code)
    ) ?? {}
});

export default read;
