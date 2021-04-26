import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Input } from '@salesforce/design-system-react';

import { ADD_COURRIER, COURRIERS } from 'requests';

const CourrierAdd = () => {
  const [id, setId] = useState(null);
  const [value, setValue] = useState(null);

  const [addCourrier] = useMutation(ADD_COURRIER, {
    refetchQueries: [{ query: COURRIERS }]
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addCourrier({ variables: { name: value, id } });
        setValue('');
        setId('');
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
          name="new_courrier_id"
          value={id}
          onChange={e => setId(e.target.value)}
          placeholder="code"
        />

        <Input
          type="text"
          name="new_courrier_name"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="description"
        />

        <Button
          disabled={!value || !id}
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

export default CourrierAdd;
