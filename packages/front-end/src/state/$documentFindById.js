import { selectorFamily, waitForAll } from 'recoil';

import { $documents } from 'state';

const $documentFindById = selectorFamily({
  key: 'documentFindById',
  get: idDocNum => ({ get }) => {
    const [documents] = get(waitForAll([$documents]));
    return [...(documents ?? [])].find(item => item.idDocNum === idDocNum);
  }
});

export default $documentFindById;
