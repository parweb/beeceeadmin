import { atom } from 'recoil';

const filters = atom({
  key: 'role.filters',
  default: {}
});

export default filters;
