import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Checkbox } from '@salesforce/design-system-react';

import { UPDATE_DISPLAY } from 'requests';

const GroupActionDisplay = ({ groupId, value = false }) => {
  const [_value, setValue] = useState(value);
  const [updateDisplay] = useMutation(UPDATE_DISPLAY);

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
          updateDisplay({
            variables: { groupId, value: e.target.checked },
            optimisticResponse: {
              __typename: 'Mutation',
              updateDisplay: {
                __typename: 'Group',
                id: groupId,
                display: e.target.checked
              }
            }
          });
        }}
      />
      afficher
    </label>
  );
};

export default GroupActionDisplay;
