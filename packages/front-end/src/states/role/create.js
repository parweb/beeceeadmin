import { $role } from 'states';
import { createRole, allRoles, createActivity } from 'services';

const create = async ({ set }, role) => {
  await createRole(role);
  await createActivity('role.create', null, role);

  const roles = await allRoles();

  set($role.list, roles);
};

export default create;
