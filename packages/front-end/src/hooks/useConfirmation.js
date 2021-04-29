import { useState, useCallback } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@salesforce/design-system-react';

import { $modalConfirmation, $roleSelected, $documentsCourriers } from 'states';

const Done = ({ label, onClick }) => {
  const [clicked, setClicked] = useState(false);
  const roles = useRecoilValue($roleSelected);
  const documentsCourriers = useRecoilValue($documentsCourriers);

  const hasCourrierDisabled =
    Object.keys(documentsCourriers).length &&
    !Object.values(documentsCourriers).every(value => value !== '0');

  const onDone = () => {
    setClicked(true);
    onClick(roles, documentsCourriers);
  };

  return (
    <Button
      id="confirm-action"
      disabled={hasCourrierDisabled || clicked}
      key="modal-confirm-footer-done"
      label={label}
      variant="brand"
      onClick={onDone}
    />
  );
};

const useConfirmation = ({
  labelDone = 'Confirmer',
  labelCancel = 'Annuler',
  onClose: onCancel = () => {},
  onDone: onSuccess = () => {},
  message,
  heading
}) => {
  const setModal = useSetRecoilState($modalConfirmation);

  const onClose = useCallback(async () => {
    await onCancel();
    setModal({ isOpen: false });
  }, [onCancel, setModal]);

  const onDone = useCallback(
    async (...data) => {
      await onSuccess(...data);
      setModal({ isOpen: false });
    },
    [onSuccess, setModal]
  );

  const result = useCallback(() => {
    setModal({
      onClose,
      heading,
      isOpen: true,
      size: 'small',
      directional: true,
      content: (
        <div style={{ padding: '30px' }}>
          <section>{message}</section>
        </div>
      ),
      footer: [
        <Button
          key="modal-confirm-footer-cancel"
          label={labelCancel}
          onClick={onClose}
        />,
        <Done label={labelDone} onClick={onDone} />
      ]
    });
  }, [onClose, heading, setModal, labelCancel, labelDone, message, onDone]);

  return result;
};

export default useConfirmation;
