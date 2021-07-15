import { selectorFamily } from 'recoil';

import { $user, $modal } from 'states';
import { BcaconnectUserEditModal } from 'application';

const modal = selectorFamily({
  key: 'user.modal',
  get:
    id =>
    ({ get }) => {
      const modal = get($modal);

      return {
        ...modal,
        title: `Edition de l'utilisateur ${id}`,
        content: <BcaconnectUserEditModal id={id} />,
        size: 'xl',
        scrollBehavior: 'inside'
      };
    },
  set:
    id =>
    ({ set, get }, options = { isOpen: true }) => {
      if ('cancelable' in options) {
        options = { isOpen: true };
      }

      const modal = get($user.modal(id));
      set($modal, state => ({ ...state, ...modal, ...options }));
    }
});

export default modal;
