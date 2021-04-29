import { atom } from 'recoil';

import { allUsers } from 'services';

const list = atom({
  key: 'user.list',
  default: allUsers()
});

export default list;
