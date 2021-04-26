import { atom } from 'recoil';

const $toasts = atom({
  key: 'toasts',
  default: []
});

export default $toasts;
