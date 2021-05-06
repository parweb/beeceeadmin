import { $group } from 'states';
import { removeGroup, allGroups } from 'services';

const remove = id => async ({ set }) => {
  await removeGroup(id);
  const groups = await allGroups();

  set($group.list, groups);
};

export default remove;
