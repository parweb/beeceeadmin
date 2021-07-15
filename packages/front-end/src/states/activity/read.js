import { selectorFamily } from 'recoil';

import { $activity } from 'states';

const read = selectorFamily({
  key: 'activity.read',
  get:
    id =>
    ({ get }) =>
      get($activity.list)?.find(activity => activity.id === id) ?? {}
});

export default read;
