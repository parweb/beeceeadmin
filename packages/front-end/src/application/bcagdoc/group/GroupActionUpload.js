import { useState } from 'react';
import { Checkbox } from '@salesforce/design-system-react';

import { $group } from 'states';
import { useMutation } from 'hooks';

const GroupActionUpload = ({ groupId, value }) => {
  const [_value, setValue] = useState(value);
  const [updateGroup] = useMutation($group.update(groupId));

  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        name="upload"
        checked={_value}
        onChange={e => {
          updateGroup({ upload: e.target.checked });
          setValue(e.target.checked);
        }}
      />
      charger
    </label>
  );
};

export default GroupActionUpload;
