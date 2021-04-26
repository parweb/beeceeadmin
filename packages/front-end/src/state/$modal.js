import { atom } from 'recoil';

const $modal = atom({
  key: 'modal',
  default: {
    isOpen: false,
    content: <div />,
    heading: '',
    footer: null,
    directional: false,
    onClose: null,
    size: 'medium',
    contentStyle: { height: '90vh' }
  }
});

export default $modal;
