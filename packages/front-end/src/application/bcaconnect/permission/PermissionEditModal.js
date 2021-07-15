import { useRecoilValue } from 'recoil';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import { $permission } from 'states';
import { useMutation } from 'hooks';

const PermissionEditModal = ({ id }) => {
  const permission = useRecoilValue($permission.read(id));
  const [updatePermission] = useMutation($permission.update(id));

  return (
    <div>
      <FormControl id="id">
        <FormLabel>ID</FormLabel>
        <Input type="type" value={permission.id} disabled />
      </FormControl>

      <br />

      <FormControl id="type">
        <FormLabel>Nom</FormLabel>
        <Input
          type="text"
          defaultValue={permission.type}
          onChange={e => updatePermission({ type: e.target.value })}
        />
      </FormControl>
    </div>
  );
};

export default PermissionEditModal;
