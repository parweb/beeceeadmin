import { atom } from 'recoil';

const sort = atom({
  key: 'role.sort',
  default: { by: 'id', direction: 'desc' }
});

export default sort;
