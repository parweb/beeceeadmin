import { useRecoilValue } from 'recoil';
import { Tooltip } from '@salesforce/design-system-react';

import { Slider } from 'layout';
import { $group } from 'states';
import { useMutation } from 'hooks';

const GroupActionSize = ({ groupId, value }) => {
  const { size } = useRecoilValue($group.read(groupId));
  const [updateGroup] = useMutation($group.update(groupId));

  return (
    <Tooltip id="tooltip" align="bottom" content={size}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <label>1</label>

        <Slider
          id="group-ation-size"
          label={`${size} Mo`}
          size="x-small"
          defaultValue={1}
          value={size}
          min={1}
          max={20}
          onChange={e => {
            updateGroup({
              size: parseInt(e.target.value === '' ? 0 : e.target.value)
            });
          }}
        />

        <label>20</label>
      </label>
    </Tooltip>
  );
};

export default GroupActionSize;
