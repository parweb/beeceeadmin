import { atom } from 'recoil';

const $uploadError = atom({
  key: 'uploadError',
  default: false
});

export default $uploadError;
