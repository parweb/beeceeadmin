import { $user } from 'states';
import { createUser, allUsers, createActivity } from 'services';

const create = async ({ set }, user) => {
  await createUser(user);
  await createActivity('user.create', null, user);

  const users = await allUsers();

  set($user.list, users);
};

export default create;
