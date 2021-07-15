import { selector } from 'recoil';

import { $activity, $modal } from 'states';
import { ActivityModal } from 'application';

const modal = selector({
  key: 'activity.modal',
  get: ({ get }) => {
    const modal = get($modal);

    return {
      ...modal,
      title: `Activités`,
      content: <ActivityModal />,
      size: 'xl',
      scrollBehavior: 'inside'
    };
  },
  set: ({ set, get }, options = { isOpen: true }) => {
    if ('cancelable' in options) {
      options = { isOpen: true };
    }

    const modal = get($activity.modal);
    set($modal, state => ({ ...state, ...modal, ...options }));
  }
});

export default modal;
