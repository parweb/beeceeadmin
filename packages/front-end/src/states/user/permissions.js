import { selectorFamily } from 'recoil';

import { $user, $modal } from 'states';
import { BcaconnectUserPermissionsEditModal } from 'application';

const permissions = selectorFamily({
  key: 'user.permissions',
  get:
    id =>
    ({ get }) => {
      const modal = get($modal);

      return {
        ...modal,
        title: `Permissions de l'utilisateur ${id}`,
        content: <BcaconnectUserPermissionsEditModal id={id} />,
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

      const modal = get($user.permissions(id));
      set($modal, state => ({ ...state, ...modal, ...options }));
    }
});

export default permissions;
