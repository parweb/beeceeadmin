import { atomFamily } from 'recoil';

const $documentTag = atomFamily({
  key: 'documentTag',
  default: id => null
});

export default $documentTag;
