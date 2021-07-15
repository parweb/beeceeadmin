import { atom } from 'recoil';

const sort = atom({
  key: 'permission.sort',
  default: { by: 'id', direction: 'desc' }
});

export default sort;
