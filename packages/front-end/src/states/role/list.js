import { atom } from 'recoil';

import { allRoles } from 'services';

const list = atom({
  key: 'role.list',
  default: allRoles()
});

export default list;
