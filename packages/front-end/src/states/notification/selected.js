import { selector } from 'recoil';

import { $notification, $value } from 'states';

const selected = selector({
  key: 'notification.selected',
  get: ({ get }) => {
    const id = get($value('notificationsSelected'));
    return id === null
      ? get($notification.list)?.find(({ name }) => name === 'intégration')
          ?.id ?? null
      : id;
  },
  set: ({ set }, value) => set($value('notificationsSelected'), value)
});

export default selected;
