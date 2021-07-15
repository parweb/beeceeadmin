import { atom } from 'recoil';

const sort = atom({
  key: 'user.sort',
  default: { by: 'id', direction: 'desc' }
});

export default sort;
