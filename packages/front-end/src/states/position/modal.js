import { selectorFamily } from 'recoil';

import { $position, $modal } from 'states';
import { BcasignPositionModal } from 'application';

const modal = selectorFamily({
  key: 'position.modal',
  get: code => ({ get }) => {
    const modal = get($modal);

    return {
      ...modal,
      content: <BcasignPositionModal code={code} />,
      size: 'xl',
      scrollBehavior: 'inside'
    };
  },
  set: code => ({ set, get }) => {
    const modal = get($position.modal(code));
    set($modal, state => ({ ...state, ...modal, isOpen: true }));
  }
});

export default modal;
