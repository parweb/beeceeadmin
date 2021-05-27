import { useRecoilState } from 'recoil';

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
  const [
    { title, onClose, isOpen, content, size, scrollBehavior, hasFooter },
    setModal
  ] = useRecoilState($modal);

  const action = {
    close: () => {
      onClose();
      setModal(state => ({ ...state, isOpen: false }));
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
          <ModalFooter>
            <Button variant="link" colorScheme="blue" onClick={action.close}>
              Annuler
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalUi>
  );
};

export default Modal;
