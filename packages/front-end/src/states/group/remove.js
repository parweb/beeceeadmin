import { $group, $service } from 'states';
import { removeGroup, allGroups, createActivity } from 'services';

const remove =
  id =>
  async ({ set, snapshot }) => {
    const service = await snapshot.getPromise(
      $service.current('bca-group-api')
    );

    await removeGroup(service.url, id);
    await createActivity('group.remove', id);

    const groups = await allGroups(service.url);

    set($group.list, groups);
  };

export default remove;
