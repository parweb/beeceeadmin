import { useCallback } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@salesforce/design-system-react';
import useMedia from 'use-media';

import { $modal, $uploadWaiting, $uploadInProgress, $upload } from 'state';
import { UploadModal } from 'components/upload';
import { useUpload } from 'hooks';

const Done = ({ onDone }) => {
  const uploadWaiting = useRecoilValue($uploadWaiting);

  const onClick = useCallback(() => {
    if (uploadWaiting.length > 0) {
      onDone();
    }
  }, [uploadWaiting, onDone]);

  return (
    <Button
      disabled={uploadWaiting.length === 0}
      label="Valider"
      variant="brand"
      onClick={onClick}
    />
  );
};

const DocumentUpload = () => {
  const isSmall = useMedia({ maxWidth: '710px' });
  const processUpload = useUpload();
  const setModal = useSetRecoilState($modal);
  const uploadInProgress = useRecoilValue($uploadInProgress);
  const setUpload = useSetRecoilState($upload);

  const onClose = () => {
    setModal(modal => ({ ...modal, isOpen: false }));
    setUpload([]);
  };

  const onDone = () => {
    processUpload.current(() => onClose());
  };

  const onClick = () => {
    setModal({
      onClose,
      isOpen: true,
      content: <UploadModal />,
      heading: 'Charger',
      size: 'large',
      footer: [
        <Button style={{ display: 'none' }} />,
        <Button label="Annuler" onClick={onClose} />,
        <Done onDone={onDone} />
      ],
      directional: true
    });
  };

  return (
    <Button
      disabled={uploadInProgress}
      data-testid="DocumentUpload"
      style={{ fontSize: isSmall ? '10px' : '15px' }}
      iconCategory="utility"
      iconName="upload"
      variant="brand"
      onClick={onClick}
      label={
        <span style={{ marginLeft: '5px' }}>
          {uploadInProgress ? 'En cours' : 'Charger'}
        </span>
      }
    />
  );
};

export default DocumentUpload;
