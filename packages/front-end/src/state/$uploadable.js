import { selector } from 'recoil';

import { $upload } from 'state';

const $uploadable = selector({
  key: 'uploadable',
  get: ({ get }) => {
    const formData = get($upload);
    return !!(formData ? [...formData.entries()] : []).length;
  }
});

export default $uploadable;
