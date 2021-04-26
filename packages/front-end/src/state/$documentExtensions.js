import { selector, waitForAll } from 'recoil';

import { $documents, $filter } from 'state';
import { format, filterByExtension, orderBy } from 'helpers';
import { imagesExtension } from 'state/qualifications';

const $documentExtensions = selector({
  key: 'documentExtensions',
  get: ({ get }) => {
    const [documents, filter] = get(waitForAll([$documents, $filter]));

    const allExtensions = [
      ...new Set(
        (documents || []).map(({ externalUrl }) => format(externalUrl)).sort()
      )
    ];

    return [
      ...allExtensions.filter(
        extension => !imagesExtension.includes(extension)
      ),
      'image'
    ]
      .map((type, i) => ({
        type,
        count: (documents || []).filter(filterByExtension(type)).length,
        isSelected: filter.some(
          item => item.type === 'extension' && item.value === type
        )
      }))
      .filter(({ count }) => count !== 0)
      .sort(orderBy('count', 'desc'));
  }
});

export default $documentExtensions;
