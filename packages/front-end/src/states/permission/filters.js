import { atom } from 'recoil';

const filters = atom({
  key: 'permission.filters',
  default: {}
});

export default filters;
