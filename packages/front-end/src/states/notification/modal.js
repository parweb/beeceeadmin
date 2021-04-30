import { selectorFamily } from 'recoil';

import { $notification, $modal } from 'states';
import { BcasignNotificationModal } from 'application';

const modal = selectorFamily({
  key: 'notification.modal',
  get: code => ({ get }) => {
    const modal = get($modal);

    return {
      ...modal,
      content: <BcasignNotificationModal code={code} />,
      size: 'xl',
      scrollBehavior: 'inside'
    };
  },
  set: code => ({ set, get }) => {
    const modal = get($notification.modal(code));
    set($modal, state => ({ ...state, ...modal, isOpen: true }));
  }
});

export default modal;
