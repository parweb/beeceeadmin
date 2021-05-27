import { selectorFamily } from 'recoil';

import { $position, $modal } from 'states';
import { BcasignPositionModal } from 'application';

const modal = selectorFamily({
  key: 'position.modal',
  get:
    codeCourrier =>
    ({ get }) => {
      const modal = get($modal);

      return {
        ...modal,
        title: `Edition de la position ${codeCourrier}`,
        content: <BcasignPositionModal codeCourrier={codeCourrier} />,
        size: 'xl',
        scrollBehavior: 'inside',
        hasFooter: true
      };
    },
  set:
    codeCourrier =>
    ({ set, get }, { isOpen = true }) => {
      const modal = get($position.modal(codeCourrier));
      set($modal, state => ({ ...state, ...modal, isOpen }));
    }
});

export default modal;
