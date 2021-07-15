import { selectorFamily } from 'recoil';

import { $role, $modal } from 'states';
import { BcaconnectRoleEditModal } from 'application';

const modal = selectorFamily({
  key: 'role.modal',
  get:
    id =>
    ({ get }) => {
      const modal = get($modal);

      return {
        ...modal,
        title: `Edition de l'utilisateur ${id}`,
        content: <BcaconnectRoleEditModal id={id} />,
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

      const modal = get($role.modal(id));
      set($modal, state => ({ ...state, ...modal, ...options }));
    }
});

export default modal;
