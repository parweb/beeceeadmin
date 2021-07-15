import { selectorFamily } from 'recoil';

import { $permission, $modal } from 'states';
import { BcaconnectPermissionEditModal } from 'application';

const modal = selectorFamily({
  key: 'permission.modal',
  get:
    id =>
    ({ get }) => {
      const modal = get($modal);

      return {
        ...modal,
        title: `Edition de l'utilisateur ${id}`,
        content: <BcaconnectPermissionEditModal id={id} />,
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

      const modal = get($permission.modal(id));
      set($modal, state => ({ ...state, ...modal, ...options }));
    }
});

export default modal;
