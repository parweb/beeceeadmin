import { atom } from 'recoil';

const filters = atom({
  key: 'user.filters',
  default: {}
});

export default filters;
