import { atom } from 'recoil';

import { allPermissions } from 'services';

const list = atom({
  key: 'permission.list',
  default: allPermissions()
});

export default list;
