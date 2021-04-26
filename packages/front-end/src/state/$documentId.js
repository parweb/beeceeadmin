import { atom } from 'recoil';

const $documentId = atom({
  key: 'documentId',
  default: null
});

export default $documentId;
