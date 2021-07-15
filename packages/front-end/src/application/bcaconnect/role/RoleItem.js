import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Tr, Td, IconButton } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';

import { $role } from 'states';
import { useMutation, useAccess } from 'hooks';
import { Switch } from 'layout';

const RoleItem = ({ id }) => {
  const can = useAccess();

  const role = useRecoilValue($role.read(id));
  const [updateRole] = useMutation($role.update(id));
  const showPermissions = useSetRecoilState($role.permissions(id));

  return (
    <Tr>
      <Td>{role.id}</Td>
      <Td>{role.type}</Td>
      <Td>
        <Switch
          disabled={!can('role.edit')}
          isChecked={role.state}
          onChange={e => updateRole({ state: e.target.checked })}
        />
      </Td>
      <Td isNumeric>
        {can('role.permissions') && (
          <IconButton onClick={showPermissions} icon={<LockIcon />} />
        )}
      </Td>
    </Tr>
  );
};

export default RoleItem;
