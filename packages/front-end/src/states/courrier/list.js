import { atom } from 'recoil';

import { allCourriers } from 'services';

const list = atom({
  key: 'courrier.list',
  default: allCourriers()
});

export default list;
