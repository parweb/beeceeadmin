import { selector } from 'recoil';

import { $user, $value } from 'states';

const selected = selector({
  key: 'user.selected',
  get: ({ get }) => {
    const id = get($value('usersSelected'));
    return id === null ? get($user.list)[0]?.id ?? null : id;
  },
  set: ({ set }, value) => set($value('usersSelected'), value)
});

export default selected;
