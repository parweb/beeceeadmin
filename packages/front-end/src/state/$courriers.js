import { atom } from 'recoil';

import { allCourriers } from 'services/document';

const $courriers = atom({
  key: 'courriers',
  default: allCourriers()
});

export default $courriers;
