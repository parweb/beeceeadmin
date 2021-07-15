import { selectorFamily } from 'recoil';

import { $role, $modal } from 'states';
import { BcaconnectRolePermissionsEditModal } from 'application';

const permissions = selectorFamily({
  key: 'role.permissions',
  get:
    id =>
    ({ get }) => {
      const modal = get($modal);

      return {
        ...modal,
        title: `Permissions du role ${id}`,
        content: <BcaconnectRolePermissionsEditModal id={id} />,
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

      const modal = get($role.permissions(id));
      set($modal, state => ({ ...state, ...modal, ...options }));
    }
});

export default permissions;
