import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Input } from '@salesforce/design-system-react';

import { ADD_GROUP, GROUPS } from 'requests';

const GroupAdd = () => {
  const [value, setValue] = useState(null);

  const [addGroup] = useMutation(ADD_GROUP, {
    refetchQueries: [{ query: GROUPS }]
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addGroup({ variables: { name: value } });
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
          iconSize="meduim"
          variant="icon"
          iconName="add"
        />
      </label>
    </form>
  );
};

export default GroupAdd;
