import { $group, $service } from 'states';
import { updateGroup, allGroups } from 'services';

const update =
  id =>
  async ({ set, snapshot }, data) => {
    const service = await snapshot.getPromise(
      $service.current('bca-group-api')
    );

    await updateGroup(service.url, id, data);
    const groups = await allGroups(service.url);

    set($group.list, groups);
  };

export default update;
