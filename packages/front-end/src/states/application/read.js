import { selectorFamily } from 'recoil';

import { $application } from 'states';

const read = selectorFamily({
  key: 'application.read',
  get: id => ({ get }) =>
    get($application.list).find(application => application.id === Number(id))
});

export default read;
