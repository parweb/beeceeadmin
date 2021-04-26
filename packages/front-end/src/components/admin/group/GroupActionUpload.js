import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Checkbox } from '@salesforce/design-system-react';

import { UPDATE_UPLOAD } from 'requests';

const GroupActionUpload = ({ groupId, value }) => {
  const [_value, setValue] = useState(value);
  const [updateUpload] = useMutation(UPDATE_UPLOAD);

  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        name="upload"
        checked={_value}
        onChange={e => {
          setValue(e.target.checked);
          updateUpload({
            variables: { groupId, value: e.target.checked },
            optimisticResponse: {
              __typename: 'Mutation',
              updateUpload: {
                __typename: 'Group',
                id: groupId,
                upload: e.target.checked
              }
            }
          });
        }}
      />
      charger
    </label>
  );
};

export default GroupActionUpload;
