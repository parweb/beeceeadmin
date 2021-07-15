import { $permission } from 'states';
import { createPermission, allPermissions, createActivity } from 'services';

const create = async ({ set }, permission) => {
  await createPermission(permission);
  await createActivity('permission.create', null, permission);

  const permissions = await allPermissions();

  set($permission.list, permissions);
};

export default create;
