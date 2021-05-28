import { selectorFamily } from 'recoil';

import { $notification, $modal } from 'states';
import { BcasignNotificationModal } from 'application';

const modal = selectorFamily({
  key: 'notification.modal',
  get:
    id =>
    ({ get }) => {
      const modal = get($modal);

      return {
        ...modal,
        content: <BcasignNotificationModal id={id} />,
        size: 'xl',
        scrollBehavior: 'inside',
        footer: <BcasignNotificationModal.Footer id={id} />
      };
    },
  set:
    id =>
    ({ set, get }, options = { isOpen: true }) => {
      if ('cancelable' in options) {
        options = { isOpen: true };
      }

      const modal = get($notification.modal(id));
      set($modal, state => ({ ...state, ...modal, ...options }));
    }
});

export default modal;
