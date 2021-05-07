import { $group, $service } from 'states';
import { createGroup, allGroups } from 'services';

const create = async ({ set, snapshot }, group) => {
  const service = await snapshot.getPromise($service.current('bca-admin-api'));

  await createGroup(service.url, group);
  const groups = await allGroups(service.url);

  set($group.list, groups);
};

export default create;
