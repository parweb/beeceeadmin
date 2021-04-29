import { $user } from 'states';
import { createUser, allUsers } from 'services';

const create = async ({ set }, user) => {
  await createUser(user);
  const users = await allUsers();

  set($user.list, users);
};

export default create;
