import { useRecoilValue } from 'recoil';

import { UserItem } from 'user';
import { $user } from 'states';

const UserList = () => {
  const users = useRecoilValue($user.list);

  return (
    <ul>
      {users?.map(({ id }) => (
        <UserItem key={`UserItem-${id}`} id={id} />
      ))}
    </ul>
  );
};

export default UserList;
