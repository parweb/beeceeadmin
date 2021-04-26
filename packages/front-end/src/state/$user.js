import { atom } from 'recoil';

const $user = atom({
  key: 'user',
  default: { isAuthenticated: false }
});

export default $user;
