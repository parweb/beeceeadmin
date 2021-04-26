import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@salesforce/design-system-react';
import { Scrollbars } from 'react-custom-scrollbars';

import { Select, Grid } from 'components/layout';
import qualifications from 'state/qualifications';
import { useDocument } from 'hooks';
import { $documentName, $permissions } from 'state';

const DocumentItemName = ({ idDocNum, editMode, setEditMode }) => {
  const { typeDocument } = useDocument(idDocNum);
  const [name, setName] = useRecoilState($documentName(idDocNum));
  const { CAN_EDIT_MISSION } = useRecoilValue($permissions);

  return (
    <Grid
      rows="1fr"
      columns="40px auto 20px"
      gap="2px"
      style={{
        padding: '5px',
        borderBottom: '1px solid #dddbda',
        maxWidth: '100%'
      }}
    >
      <div>Nom</div>

      {editMode && (
        <Select
          id="select-name"
          variant="readonly"
          value={name}
          onChange={setName}
          options={qualifications[
            typeDocument === 'PHO' ? 'photo' : 'document'
          ]()}
        />
      )}

      {!editMode && (
        <Scrollbars autoHide>
          <div id="name-text" style={{ whiteSpace: 'nowrap' }}>
            {name.label}
          </div>
        </Scrollbars>
      )}

      {CAN_EDIT_MISSION && (
        <Button
          id="edit-document"
          onClick={() => setEditMode(true)}
          iconCategory="utility"
          iconName="edit"
          variant="icon"
        />
      )}
    </Grid>
  );
};

export default DocumentItemName;
