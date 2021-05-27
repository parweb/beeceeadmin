import { atom } from 'recoil';

const $modal = atom({
  key: 'modal',
  default: {
    isOpen: false,
    title: '',
    onClose: () => {},
    content: '',
    size: undefined,
    scrollBehavior: 'outside',
    hasFooter: false
  }
});

export default $modal;
