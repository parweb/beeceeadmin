import { atom } from 'recoil';

import { allGroups } from 'services';

const list = atom({
  key: 'group.list',
  default: allGroups()
});

export default list;
