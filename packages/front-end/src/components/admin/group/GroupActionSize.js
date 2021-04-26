import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Tooltip } from '@salesforce/design-system-react';

import { UPDATE_SIZE } from 'requests';
import { Slider } from 'components/layout';

const GroupActionSize = ({ groupId, value }) => {
  const [_value, setValue] = useState(value);
  const [updateSize] = useMutation(UPDATE_SIZE);

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

            setValue(size);
            updateSize({
              variables: { groupId, value: size },
              optimisticResponse: {
                __typename: 'Mutation',
                updateSize: {
                  __typename: 'Group',
                  id: groupId,
                  size: size
                }
              }
            });
          }}
        />

        <label>20</label>

        {/* <Input
          styleContainer={{ width: '60px' }}
          type="text"
          name="size"
          value={_value}
          onChange={e => {
            const size = parseInt(e.target.value === '' ? 0 : e.target.value);

            setValue(size);
            updateSize({
              variables: { groupId, value: size },
              optimisticResponse: {
                __typename: 'Mutation',
                updateSize: {
                  __typename: 'Group',
                  id: groupId,
                  size: size
                }
              }
            });
          }}
          maxLength={1}
        > */}
        {/* <div
            style={{
              display: 'flex',
              marginRight: '-1px',
              position: 'absolute',
              top: '1px',
              right: '2px'
            }}
          >
            <span
              style={{
                padding: '0.34rem .25rem',

                fontSize: '0.75rem',

                color: '#495057',
                textAlign: 'center',

                backgroundColor: '#e9ecef',
                border: '1px solid #ced4da',
                borderTopRightRadius: '.25rem',
                borderBottomRightRadius: '.25rem'
              }}
            >
              Mo
            </span>
          </div>
        </Input>
        taille */}
      </label>
    </Tooltip>
  );
};

export default GroupActionSize;
