import { selector } from 'recoil';

import {
  $upload,
  $uploadFile,
  $uploadQualification,
  $uploadError
} from 'state';
import { DeleteUploadItem } from 'components/upload';
import { DocumentDoctype } from 'components/document';
import { getTypeDocumentFromForm } from 'helpers';

const $uploadWaiting = selector({
  key: 'uploadWaiting',
  get: ({ get }) => get($upload),
  set: ({ set, get }) => {
    const file = get($uploadFile);
    const qualification = get($uploadQualification);

    if (file === null || qualification === null) return;

    const id = new Date().getTime();

    const typeDocument =
      getTypeDocumentFromForm(file) === 'photo' ? 'PHO' : 'GPJ';

    set($upload, state => [
      ...state,
      {
        id,
        state: 'waiting',
        type: <DocumentDoctype extension="attachment" />,
        name: qualification && qualification.label,
        file,
        typeDocument,
        qualification,
        delete: <DeleteUploadItem id={id} />
      }
    ]);
    set($uploadFile, null);
    set($uploadQualification, null);
    set($uploadError, false);
  }
});

export default $uploadWaiting;
