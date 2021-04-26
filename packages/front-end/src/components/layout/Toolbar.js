import { useRecoilValue } from 'recoil';
import useMedia from 'use-media';

import {
  DocumentUpload,
  DocumentSort,
  DocumentFilter,
  DocumentRefresh
} from 'components/document';

import { Grid, GridColumn } from 'components/layout';
import { SignatureFilter } from 'components/signature';
import { DissociationFilter } from 'components/dissociation';
import { $permissions } from 'state';

const Toolbar = () => {
  const isSmall = useMedia({ maxWidth: '1087px' });

  const {
    CAN_UPLOAD_MISSION,
    CAN_DISSOCIATE_MISSION,
    CAN_SIGN_MISSION
  } = useRecoilValue($permissions);

  return (
    <Grid
      id="toolbar"
      rows="1fr"
      columns={isSmall ? '1fr 1fr 2fr' : 'repeat(10, 1fr)'}
      gap="10px"
      style={{
        margin: '-10px -10px 0 -10px',
        background: '#f3f2f2',
        position: 'sticky',
        top: '0px',
        zIndex: 2,
        padding: '16px'
      }}
    >
      <Grid
        columns="1fr 1fr"
        rows="1fr"
        gap="10px"
        position={isSmall ? [1, 1] : [1, 4]}
        style={{
          textAlign: 'center'
        }}
      >
        {CAN_DISSOCIATE_MISSION && <DissociationFilter />}
        {CAN_SIGN_MISSION && <SignatureFilter />}
      </Grid>

      {CAN_UPLOAD_MISSION && (
        <GridColumn
          position={isSmall ? [2, 2] : [5, 6]}
          style={{
            textAlign: 'center'
          }}
        >
          <DocumentUpload />
        </GridColumn>
      )}

      <Grid
        columns="auto 1fr 1fr"
        rows="1fr"
        gap="10px"
        position={isSmall ? [3, 3] : [8, 10]}
        style={{
          textAlign: 'center'
        }}
      >
        <DocumentRefresh />
        <DocumentFilter />
        <DocumentSort />
      </Grid>
    </Grid>
  );
};

export default Toolbar;
