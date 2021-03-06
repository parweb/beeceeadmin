import { useRecoilValue } from 'recoil';
import { Checkbox } from '@salesforce/design-system-react';

import { $group } from 'states';
import { useMutation, useAccess } from 'hooks';

const GroupActionUpload = ({ groupId, value }) => {
  const can = useAccess();

  const { upload } = useRecoilValue($group.read(groupId));
  const [updateGroup] = useMutation($group.update(groupId));

  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        disabled={!can('extension.edit')}
        name="upload"
        checked={upload}
        onChange={e => {
          updateGroup({ upload: e.target.checked });
        }}
      />
      charger
    </label>
  );
};

export default GroupActionUpload;
