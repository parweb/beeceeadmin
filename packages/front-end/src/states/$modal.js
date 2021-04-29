import { atom } from 'recoil';

const $modal = atom({
  key: 'modal',
  default: {
    isOpen: false,
    title: '',
    onClose: () => {},
    content: '',
    size: undefined,
    width: undefined,
    scrollBehavior: 'outside'
  }
});

export default $modal;
