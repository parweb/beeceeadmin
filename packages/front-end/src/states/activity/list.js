import { selector } from 'recoil';

import { allActivities } from 'services';
import { $auth } from 'states';

const list = selector({
  key: 'activity.list',
  get: ({ get }) => {
    const auth = get($auth);
    return allActivities({ user: auth.id });
  }
});

export default list;
