import { selector } from 'recoil';

import { $permission, $value } from 'states';

const selected = selector({
  key: 'permission.selected',
  get: ({ get }) => {
    const id = get($value('permissionsSelected'));
    return id === null ? get($permission.list)[0]?.id ?? null : id;
  },
  set: ({ set }, value) => set($value('permissionsSelected'), value)
});

export default selected;
