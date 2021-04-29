import { useRecoilValue } from 'recoil';
import { Modal as ModalSalesforce } from '@salesforce/design-system-react';

import { $modalConfirmation } from 'states';

const ModalConfirmation = () => {
  const modal = useRecoilValue($modalConfirmation);

  return (
    <ModalSalesforce
      size={modal.size}
      isOpen={modal.isOpen}
      onRequestClose={modal.onClose}
      heading={modal.heading}
      footer={modal.footer}
      contentStyle={modal.contentStyle}
      directional={modal.directional}
      portalClassName="modal-secondary"
    >
      {modal.content}
    </ModalSalesforce>
  );
};

export default ModalConfirmation;
