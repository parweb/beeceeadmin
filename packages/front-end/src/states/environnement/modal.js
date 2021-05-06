import { selector } from 'recoil';

import { $environnement, $modal } from 'states';
import { EnvironnementModal } from 'application';

const modal = selector({
  key: 'environnement.modal',
  get: ({ get }) => {
    const modal = get($modal);
    return {
      ...modal,
      content: <EnvironnementModal />,
      size: 'full',
      scrollBehavior: 'inside'
    };
  },
  set: ({ set, get }, options) => {
    const modal = get($environnement.modal);
    set($modal, state => ({ ...state, ...modal, isOpen: true, ...options }));
  }
});

export default modal;
