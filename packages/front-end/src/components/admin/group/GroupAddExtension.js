import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@salesforce/design-system-react';

import { EXTENSIONS, GROUPS, ADD_EXTENSIONS_TO_GROUP } from 'requests';
import { Select } from 'components/layout';

const GroupAddExtension = ({ groupId }) => {
  const [value, setValue] = useState(null);
  const { loading, error, data: { extensions } = {} } = useQuery(EXTENSIONS);
  const [addExtensionToGroup] = useMutation(ADD_EXTENSIONS_TO_GROUP, {
    refetchQueries: [{ query: GROUPS }]
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addExtensionToGroup({ variables: { extensionId: value.id, groupId } });
        setValue(null);
      }}
    >
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Select
          options={extensions.map(({ id, name, description }) => ({
            id,
            label: `${name} - ${description}`
          }))}
          value={value}
          onChange={setValue}
          variant="inline-listbox"
          labels={{
            placeholder: 'Ajouter une extension'
          }}
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

export default GroupAddExtension;
