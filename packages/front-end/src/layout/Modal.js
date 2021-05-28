import { useRecoilValue, useResetRecoilState } from 'recoil';

import {
  Button,
  Modal as ModalUi,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

import { $modal } from 'states';

const Modal = () => {
  const {
    title,
    onClose,
    isOpen,
    content,
    size,
    scrollBehavior,
    hasFooter,
    footer
  } = useRecoilValue($modal);

  const resetModal = useResetRecoilState($modal);

  const action = {
    close: () => {
      onClose();
      resetModal();
    }
  };

  return (
    <ModalUi
      isOpen={isOpen}
      size={size}
      onClose={action.close}
      scrollBehavior={scrollBehavior}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalCloseButton />

        <ModalHeader>{title}</ModalHeader>

        <ModalBody>{content}</ModalBody>

        {hasFooter === false && (
          <ModalFooter style={{ gap: '5px' }}>
            <Button variant="outline" colorScheme="blue" onClick={action.close}>
              Fermer
            </Button>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </ModalUi>
  );
};

export default Modal;
