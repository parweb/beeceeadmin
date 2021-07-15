import { useRecoilValue } from 'recoil';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import { $role } from 'states';
import { useMutation } from 'hooks';

const RoleEditModal = ({ id }) => {
  const role = useRecoilValue($role.read(id));
  const [updateRole] = useMutation($role.update(id));

  return (
    <div>
      <FormControl id="id">
        <FormLabel>ID</FormLabel>
        <Input type="type" value={role.id} disabled />
      </FormControl>

      <br />

      <FormControl id="type">
        <FormLabel>Nom</FormLabel>
        <Input
          type="text"
          defaultValue={role.type}
          onChange={e => updateRole({ type: e.target.value })}
        />
      </FormControl>
    </div>
  );
};

export default RoleEditModal;
