import { useSetRecoilState } from 'recoil';
import { Button } from '@salesforce/design-system-react';

import { $upload } from 'state';

const DeleteUploadItem = ({ id }) => {
  const setUpload = useSetRecoilState($upload);

  return (
    <Button
      className="delete-upload-item"
      onClick={() => {
        setUpload(state => state.filter(item => item.id !== id));
      }}
      iconCategory="utility"
      iconName="delete"
      iconSize="large"
      variant="icon"
    />
  );
};

export default DeleteUploadItem;
