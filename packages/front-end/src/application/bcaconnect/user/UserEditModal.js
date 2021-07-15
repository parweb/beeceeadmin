import { useRecoilValue } from 'recoil';

import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import { $user, $role } from 'states';
import { useMutation } from 'hooks';
import { Switch, Select } from 'layout';

const SelectRole = ({ value, onChange }) => {
  const roles = useRecoilValue($role.list);

  return (
    <Select
      labels={{
        placeholder: 'Choisissez un role'
      }}
      options={roles.map(({ id, type }) => ({
        id,
        label: type
      }))}
      value={value}
      onChange={onChange}
      variant="inline-listbox"
    />
  );
};

const UserEditModal = ({ id }) => {
  const user = useRecoilValue($user.read(id));
  const [updateUser] = useMutation($user.update(id));

  return (
    <div>
      <FormControl id="id">
        <FormLabel>ID</FormLabel>
        <Input type="type" value={user.id} disabled />
      </FormControl>

      <br />

      <FormControl id="username">
        <FormLabel>Login</FormLabel>
        <Input
          type="type"
          defaultValue={user.username}
          onChange={e => updateUser({ username: e.target.value })}
        />
      </FormControl>

      <br />

      <FormControl id="role">
        <FormLabel>Role</FormLabel>
        <SelectRole
          value={user.role ? { id: user.role.id, label: user.role.type } : null}
          onChange={value => updateUser({ role: value })}
        />
      </FormControl>

      <br />

      <FormControl id="state">
        <FormLabel>État</FormLabel>
        <Switch
          isChecked={user.state}
          onChange={e => updateUser({ state: e.target.checked })}
        />
      </FormControl>
    </div>
  );
};

export default UserEditModal;
