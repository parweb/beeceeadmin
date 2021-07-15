import { selector } from 'recoil';

import { $role, $value } from 'states';

const selected = selector({
  key: 'role.selected',
  get: ({ get }) => {
    const id = get($value('rolesSelected'));
    return id === null ? get($role.list)[0]?.id ?? null : id;
  },
  set: ({ set }, value) => set($value('rolesSelected'), value)
});

export default selected;
