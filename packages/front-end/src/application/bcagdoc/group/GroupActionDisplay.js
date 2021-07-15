import { useRecoilValue } from 'recoil';
import { Checkbox } from '@salesforce/design-system-react';

import { $group } from 'states';
import { useMutation, useAccess } from 'hooks';

const GroupActionDisplay = ({ groupId, value = false }) => {
  const can = useAccess();

  const { display } = useRecoilValue($group.read(groupId));
  const [updateGroup] = useMutation($group.update(groupId));

  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Checkbox
        disabled={!can('extension.edit')}
        name="display"
        checked={display}
        onChange={e => {
          updateGroup({ display: e.target.checked });
        }}
      />
      afficher
    </label>
  );
};

export default GroupActionDisplay;
