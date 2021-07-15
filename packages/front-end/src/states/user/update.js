import { $user } from 'states';
import { updateUser, allUsers, createActivity } from 'services';

const update =
  id =>
  async ({ set }, data) => {
    await updateUser(id, data);
    await createActivity('user.update', id, data);

    const users = await allUsers();

    set($user.list, users);
  };

export default update;
