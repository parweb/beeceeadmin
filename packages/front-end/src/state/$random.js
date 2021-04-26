import { atomFamily } from 'recoil';

const $random = atomFamily({
  key: 'random',
  default: 0
});

export default $random;
