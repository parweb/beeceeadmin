import { useState } from 'react';
import { Checkbox } from '@salesforce/design-system-react';

import { $group } from 'states';
import { useMutation } from 'hooks';

const GroupActionDisplay = ({ groupId, value = false }) => {
  const [_value, setValue] = useState(value);
  const [updateGroup] = useMutation($group.update(groupId));

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Checkbox
        name="display"
        checked={_value}
        onChange={e => {
          setValue(e.target.checked);
          updateGroup({ display: e.target.checked });
        }}
      />
      afficher
    </label>
  );
};

export default GroupActionDisplay;
