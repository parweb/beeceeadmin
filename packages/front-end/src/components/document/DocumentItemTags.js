import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@salesforce/design-system-react';

import { DocumentTag } from 'components/document';
import { useDocument } from 'hooks';
import { Grid } from 'components/layout';
import { $documentTag, $permissions } from 'state';

const DocumentItemTags = ({ idDocNum, editMode, setEditMode }) => {
  const { typeDocument, photoAO, photo418, photoRapport } = useDocument(
    idDocNum
  );
  const [documentTag, setDocumentTag] = useRecoilState($documentTag(idDocNum));

  const { CAN_EDIT_MISSION } = useRecoilValue($permissions);

  useEffect(() => {
    setDocumentTag({ photoAO, photo418, photoRapport });
  }, [editMode, setDocumentTag, photoAO, photo418, photoRapport]);

  return (
    <Grid
      rows="1fr"
      columns="1fr 20px"
      gap="5px"
      style={{
        textAlign: 'center',
        cursor: 'pointer',
        padding: '5px',
        visibility: typeDocument === 'PHO' ? 'visible' : 'hidden'
      }}
    >
      <Grid rows="1fr" columns="1fr 1fr 1fr" gap="3px">
        {!editMode && (
          <>
            <DocumentTag label="AO" disabled={!photoAO} />
            <DocumentTag label="RA" disabled={!photoRapport} />
            <DocumentTag label="CO" disabled={!photo418} />
          </>
        )}

        {editMode && (
          <>
            <DocumentTag
              label="AO"
              active={documentTag.photoAO}
              onClick={() => {
                setDocumentTag(state => ({
                  ...state,
                  photoAO: !state.photoAO
                }));
              }}
            />

            <DocumentTag
              label="RA"
              onClick={() => {
                setDocumentTag(state => ({
                  ...state,
                  photoRapport: !state.photoRapport
                }));
              }}
              active={documentTag.photoRapport}
            />

            <DocumentTag
              label="CO"
              onClick={() => {
                setDocumentTag(state => ({
                  ...state,
                  photo418: !state.photo418
                }));
              }}
              active={documentTag.photo418}
            />
          </>
        )}
      </Grid>

      {CAN_EDIT_MISSION && (
        <Button
          id="edit-tag"
          onClick={() => setEditMode(true)}
          iconCategory="utility"
          iconName="edit"
          variant="icon"
        />
      )}
    </Grid>
  );
};

export default DocumentItemTags;
