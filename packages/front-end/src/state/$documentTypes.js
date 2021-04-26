import { selector, waitForAll } from 'recoil';

import { $documents, $filter } from 'state';
import { filterByType } from 'helpers';

const $documentTypes = selector({
  key: 'documentTypes',
  get: ({ get }) => {
    const [documents, filter] = get(waitForAll([$documents, $filter]));

    return [
      { id: 'all', label: 'Tous' },
      { id: 'photos', label: 'Photos' },
      { id: 'others', label: 'Autres' }
    ].map(({ id, label }) => ({
      id,
      label,
      count: (documents || []).filter(filterByType(id)).length,
      isSelected: filter.some(item => item.type === 'type' && item.value === id)
    }));
  }
});

export default $documentTypes;
