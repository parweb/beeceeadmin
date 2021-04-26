import { useState } from 'react';
import { Button } from '@salesforce/design-system-react';
import { useRecoilValue } from 'recoil';

import {
  DocumentItemImg,
  DocumentItemName,
  DocumentItemDate,
  DocumentItemTags,
  DocumentItemDissociate,
  DocumentItemSignature,
  DocumentItemActions
} from 'components/document';

import { $documentSelected, $documentName } from 'state';

const DocumentItem = ({
  idDocNum,
  photoAO: _photoAO = false,
  photo418: _photo418 = false,
  photoRapport: _photoRapport = false,
  numDos
}) => {
  const [editMode, setEditMode] = useState(false);

  const name = useRecoilValue($documentName(idDocNum));
  const select = useRecoilValue($documentSelected);

  const isSelected = select.some(item => item.idDocNum === idDocNum);

  return (
    <div
      id={`document-item-${idDocNum}`}
      className="document-item"
      style={{ position: 'relative' }}
    >
      <DocumentItemImg {...{ idDocNum }} />

      <div style={{ border: '1px solid #dddbda', padding: '0 5px' }}>
        <DocumentItemName {...{ idDocNum, editMode, setEditMode }} />
        <DocumentItemDate {...{ idDocNum }} />
        <DocumentItemTags {...{ idDocNum, editMode, setEditMode }} />
        <DocumentItemActions {...{ idDocNum, editMode, setEditMode }} />
      </div>

      <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
        {isSelected && (
          <Button variant="icon" iconCategory="action" iconName="check" />
        )}
      </div>

      <div style={{ position: 'absolute', top: '3px', right: '3px' }}>
        <DocumentItemDissociate {...{ idDocNum, name }} />
        <DocumentItemSignature {...{ idDocNum, name }} />
      </div>
    </div>
  );
};

export default DocumentItem;
