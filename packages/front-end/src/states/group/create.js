import { $group, $service } from 'states';
import { createGroup, allGroups, createActivity } from 'services';

const create = async ({ set, snapshot }, group) => {
  const service = await snapshot.getPromise($service.current('bca-group-api'));

  await createGroup(service.url, group);
  await createActivity('group.create', null, group);

  const groups = await allGroups(service.url);

  set($group.list, groups);
};

export default create;
