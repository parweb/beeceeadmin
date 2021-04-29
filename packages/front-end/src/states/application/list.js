import { atom } from 'recoil';

import { allApplications } from 'services';

const list = atom({
  key: 'application.list',
  default: allApplications()
});

export default list;
