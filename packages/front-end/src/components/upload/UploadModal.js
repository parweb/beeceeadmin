import { useSetRecoilState } from 'recoil';
import { Button } from '@salesforce/design-system-react';

import { $uploadWaiting, $uploadError } from 'state';
import {
  UploadInput,
  UploadQualification,
  UploadTree
} from 'components/upload';

const UploadModal = () => {
  const setDisplayError = useSetRecoilState($uploadError);
  const addToUpload = useSetRecoilState($uploadWaiting);

  return (
    <div style={{ padding: '30px' }}>
      <section style={{ marginBottom: '20px' }}>
        <UploadInput />
      </section>

      <section>
        <UploadQualification />
      </section>

      <center style={{ margin: '20px' }}>
        <Button
          onClick={() => {
            setDisplayError(true);
            addToUpload();
          }}
          label="Ajouter"
        />
      </center>

      <section style={{ margin: '0 -30px' }}>
        <UploadTree />
      </section>
    </div>
  );
};

export default UploadModal;
