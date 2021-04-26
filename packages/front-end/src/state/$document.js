import { selector, waitForAll } from 'recoil';

import { $documentId, $documents } from 'state';

const $document = selector({
  key: 'document',
  get: ({ get }) => {
    const [id, documents] = get(waitForAll([$documentId, $documents]));

    return documents === null
      ? null
      : documents.find(({ idDocNum }) => idDocNum === parseInt(id));
  }
});

export default $document;
