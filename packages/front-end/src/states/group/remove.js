import { $group, $service } from 'states';
import { removeGroup, allGroups } from 'services';

const remove = id => async ({ set, snapshot }) => {
  const service = await snapshot.getPromise($service.current('bca-admin-api'));

  await removeGroup(service.url, id);
  const groups = await allGroups(service.url);

  set($group.list, groups);
};

export default remove;
