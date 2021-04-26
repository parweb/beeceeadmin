import { selector } from 'recoil';

import { $rules } from 'state';

const $rulesUpload = selector({
  key: 'rulesUpload',
  get: ({ get }) => {
    const {
      data: { groups }
    } = get($rules);
    const result = groups
      .filter(({ upload }) => upload === true)
      .flatMap(({ extensions }) => extensions)
      .map(({ name }) => name);

    return result;
  }
});

export default $rulesUpload;
