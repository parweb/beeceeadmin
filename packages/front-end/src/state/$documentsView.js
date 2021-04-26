import { selector, waitForAll } from 'recoil';

import { filterDocuments, orderBy, getName, format } from 'helpers';
import { $documents, $filter, $sort } from 'state';

const sortTransform = {
  url: format,
  dateCreation: x => new Date(x).getTime(),
  codeQualification: (x, _x) => getName(_x.typeDocument, x).label.trim()
};

const $documentsView = selector({
  key: 'documentsView',
  get: ({ get }) => {
    const [documents, filters, sort] = get(
      waitForAll([$documents, $filter, $sort])
    );

    return documents === null || documents === undefined
      ? documents
      : filterDocuments(documents, filters).sort(
          orderBy(sort.by, sort.direction, sortTransform[sort.by] ?? null)
        );
  }
});

export default $documentsView;
