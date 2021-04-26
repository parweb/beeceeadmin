import { selector } from 'recoil';

import { $upload } from 'state';

const $uploadInProgress = selector({
  key: 'uploadInProgress',
  get: ({ get }) =>
    get($upload).filter(({ state }) => state === 'uploading').length > 0
});

export default $uploadInProgress;
