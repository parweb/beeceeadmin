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
    { title, onClose, isOpen, content, size, width, scrollBehavior },
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
      <ModalContent style={{ maxWidth: width }}>
        <ModalCloseButton />

        <ModalHeader>{title}</ModalHeader>

        <ModalBody>{content}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={action.close}>
            Fermer
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalUi>
  );
};

export default Modal;
