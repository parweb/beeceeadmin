import { useRecoilState, useRecoilValue } from 'recoil';

import { $user } from 'states';

const UserItem = ({ id }) => {
  const { name, posts } = useRecoilValue($user.read(id));
  const [selected, selectUser] = useRecoilState($user.selected);

  return (
    <li
      style={{
        display: 'flex',
        gap: '5px',
        background: selected === id ? '#ccc' : 'transparent',
        padding: '5px 10px',
        cursor: 'pointer',
        justifyContent: 'space-between'
      }}
      onClick={() => selectUser(id)}
    >
      {name} {id}
      <span
        style={{
          background: '#aaa',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {posts?.length}
      </span>
    </li>
  );
};

export default UserItem;
