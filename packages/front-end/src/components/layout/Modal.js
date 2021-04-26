import { useRecoilState } from 'recoil';
import { Modal as ModalSalesforce } from '@salesforce/design-system-react';

import { $modal } from 'state';

const Modal = ({ size }) => {
  const [modal, setModal] = useRecoilState($modal);

  return modal.isOpen ? (
    <ModalSalesforce
      id="modal"
      size={modal.size}
      isOpen={modal.isOpen}
      onRequestClose={modal.onClose || (() => setModal({ isOpen: false }))}
      heading={modal.heading}
      footer={modal.footer}
      contentStyle={modal.contentStyle}
      directional={modal.directional}
      portalClassName="modal-primary"
    >
      {modal.content}
    </ModalSalesforce>
  ) : null;
};

export default Modal;
