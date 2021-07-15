import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Tr, Td, IconButton } from '@chakra-ui/react';
import { EditIcon, LockIcon, DeleteIcon } from '@chakra-ui/icons';

import { $user } from 'states';
import { useMutation, useAccess } from 'hooks';
import { Switch } from 'layout';

const UserItem = ({ id }) => {
  const can = useAccess();

  const user = useRecoilValue($user.read(id));
  const [updateUser] = useMutation($user.update(id));
  const showEdit = useSetRecoilState($user.modal(id));
  const showPermissions = useSetRecoilState($user.permissions(id));

  return (
    <Tr>
      <Td>{user.id}</Td>
      <Td>{user.role?.type}</Td>
      <Td>{user.username}</Td>
      <Td>
        <Switch
          isChecked={user.state}
          onChange={e => updateUser({ state: e.target.checked })}
        />
      </Td>
      <Td isNumeric>
        {can('user.permissions') && (
          <IconButton onClick={showPermissions} icon={<LockIcon />} />
        )}
        {can('user.edit') && (
          <IconButton onClick={showEdit} icon={<EditIcon />} />
        )}
        {can('user.delete') && <IconButton icon={<DeleteIcon />} />}
      </Td>
    </Tr>
  );
};

export default UserItem;
