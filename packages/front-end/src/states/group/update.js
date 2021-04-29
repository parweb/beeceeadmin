import { $group } from 'states';
import { updateGroup, allGroups } from 'services';

const update = id => async ({ set }, data) => {
  await updateGroup(id, data);
  const groups = await allGroups();

  set($group.list, groups);
};

export default update;
