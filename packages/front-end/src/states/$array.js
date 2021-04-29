import { atomFamily } from 'recoil';

const $array = atomFamily({
  key: 'array',
  default: []
});

export default $array;
