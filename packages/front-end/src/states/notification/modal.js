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
        footer: <BcasignNotificationModal.Footer />
      };
    },
  set:
    id =>
    ({ set, get }) => {
      const modal = get($notification.modal(id));
      set($modal, state => ({ ...state, ...modal, isOpen: true }));
    }
});

export default modal;
