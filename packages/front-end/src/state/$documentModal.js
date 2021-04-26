import { selector } from 'recoil';

import { DocumentModal } from 'components/document';
import { $documentId, $modal } from 'state';

const $documentModal = selector({
  key: 'documentModal',
  set: ({ set, get }, id) => {
    set($documentId, id);

    if (id === null) {
      set($modal, state => ({
        isOpen: false
      }));
    } else {
      set($modal, state => ({
        ...state,
        // onClose,
        isOpen: true,
        contentStyle: {
          height: '90vh',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto auto 1fr',
          overflow: 'hidden',
          position: 'relative'
        },
        size: 'large',
        content: <DocumentModal />
      }));
    }
  }
});

export default $documentModal;
