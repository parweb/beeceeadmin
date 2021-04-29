import { useState } from 'react';
import { Tooltip } from '@salesforce/design-system-react';

import { Slider } from 'layout';
import { $group } from 'states';
import { useMutation } from 'hooks';

const GroupActionSize = ({ groupId, value }) => {
  const [_value, setValue] = useState(value);
  const [updateGroup] = useMutation($group.update(groupId));

  return (
    <Tooltip id="tooltip" align="bottom" content={_value}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <label>1</label>

        <Slider
          id="group-ation-size"
          label={`${_value} Mo`}
          size="x-small"
          defaultValue={1}
          value={_value}
          min={1}
          max={20}
          onChange={e => {
            const size = parseInt(e.target.value === '' ? 0 : e.target.value);

            updateGroup({ size });
            setValue(size);
          }}
        />

        <label>20</label>
      </label>
    </Tooltip>
  );
};

export default GroupActionSize;
