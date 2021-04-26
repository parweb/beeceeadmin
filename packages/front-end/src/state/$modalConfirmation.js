import { atom } from 'recoil';

const $modalConfirmation = atom({
  key: 'modalConfirmation',
  default: {
    isOpen: false,
    content: <div />,
    heading: '',
    footer: null,
    directional: false,
    onClose: null,
    size: null,
    contentStyle: {}
  }
});

export default $modalConfirmation;
