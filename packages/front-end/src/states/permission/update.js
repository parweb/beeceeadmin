import { $permission } from 'states';
import { updatePermission, allPermissions, createActivity } from 'services';

const update =
  id =>
  async ({ set }, data) => {
    await updatePermission(id, data);
    await createActivity('permission.update', id, data);

    const permissions = await allPermissions();

    set($permission.list, permissions);
  };

export default update;
