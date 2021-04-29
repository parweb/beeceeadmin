import { atom } from 'recoil';

import { allClients } from 'services';

const list = atom({
  key: 'client.list',
  default: allClients()
});

export default list;
