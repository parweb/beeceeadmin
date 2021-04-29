import { selector } from 'recoil';

import { $application, $value } from 'states';

const selected = selector({
  key: 'application.selected',
  get: ({ get }) => {
    const id = get($value('applicationsSelected'));
    return id === null ? get($application.list)[0]?.id ?? null : id;
  },
  set: ({ set }, value) => set($value('applicationsSelected'), value)
});

export default selected;
