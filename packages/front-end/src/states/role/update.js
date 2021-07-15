import { $role, $user } from 'states';
import { updateRole, allRoles, allUsers, createActivity } from 'services';

const update =
  id =>
  async ({ set }, data) => {
    await updateRole(id, data);
    await createActivity('role.update', id, data);

    const [roles, users] = await Promise.all([allRoles(), allUsers()]);

    set($role.list, roles);
    set($user.list, users);
  };

export default update;
