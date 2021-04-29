import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Button } from '@salesforce/design-system-react';

import { Select } from 'layout';
import { $extension, $group } from 'states';
import { useMutation } from 'hooks';

const GroupAddExtension = ({ groupId }) => {
  const [value, setValue] = useState(null);
  const extensions = useRecoilValue($extension.list);
  const [updateGroup] = useMutation($group.update(groupId));

  return (
    <form
      onSubmit={e => {
        e.preventDefault();

        updateGroup({
          extension: value.id
        });

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
          iconSize="medium"
          variant="icon"
          iconName="add"
        />
      </label>
    </form>
  );
};

export default GroupAddExtension;
