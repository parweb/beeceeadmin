import { useRecoilValue } from 'recoil';
import { Tr, Td, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { $permission } from 'states';
import { useAccess } from 'hooks';

const PermissionItem = ({ id }) => {
  const can = useAccess();
  const permission = useRecoilValue($permission.read(id));

  return (
    <Tr>
      <Td>{permission.id}</Td>
      <Td>{`${permission.subject}.${permission.action}`}</Td>

      <Td isNumeric>
        {can('permission.delete') && <IconButton icon={<DeleteIcon />} />}
      </Td>
    </Tr>
  );
};

export default PermissionItem;
