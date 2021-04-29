import { atom } from 'recoil';

import { allEnvironnements } from 'services';

const list = atom({
  key: 'environnement.list',
  default: allEnvironnements()
});

export default list;
