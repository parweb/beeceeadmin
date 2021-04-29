import { $group } from 'states';
import { createGroup, allGroups } from 'services';

const create = async ({ set }, group) => {
  await createGroup(group);
  const groups = await allGroups();

  set($group.list, groups);
};

export default create;
