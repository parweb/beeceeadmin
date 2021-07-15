import { AddIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';

import { $permission } from 'states';
import { useMutation } from 'hooks';

const PermissionAdd = () => {
  const [createPermission] = useMutation($permission.create);

  return (
    <IconButton
      onClick={() => {
        const operation = prompt("Nom de l'opération ?");
        const [subject, action] = operation.split('.');

        createPermission({ subject, action });
      }}
      icon={<AddIcon />}
    />
  );
};

export default PermissionAdd;
