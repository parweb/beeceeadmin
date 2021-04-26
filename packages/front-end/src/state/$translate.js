import { atom } from 'recoil';

const $translate = atom({
  key: 'translate',
  default: { x: 0, y: 0 }
});

export default $translate;
