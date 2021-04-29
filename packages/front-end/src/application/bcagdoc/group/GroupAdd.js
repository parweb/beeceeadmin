import { useState } from 'react';
import { Button, Input } from '@salesforce/design-system-react';

import { $group } from 'states';
import { useMutation } from 'hooks';

const GroupAdd = () => {
  const [value, setValue] = useState(null);
  const [addGroup] = useMutation($group.create);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addGroup({ name: value });
        setValue('');
      }}
      style={{
        borderBottom: '1px solid #000',
        margin: '10px',
        paddingBottom: '10px'
      }}
    >
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Input
          type="text"
          name="new_group_name"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Ajouter un groupe"
        />

        <Button
          disabled={!value}
          type="submit"
          iconCategory="utility"
          iconSize="medium"
          variant="icon"
          iconName="add"
        />
      </label>
    </form>
  );
};

export default GroupAdd;
