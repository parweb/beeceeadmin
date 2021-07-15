import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { $notification } from 'states';
import { useMutation, useConfirmation, useToast, useAccess } from 'hooks';

const NotificationItem = ({ id }) => {
  const can = useAccess();

  const { code, description } = useRecoilValue($notification.read(id));
  const editModal = useSetRecoilState($notification.modal(id));
  const [removeNotification] = useMutation($notification.remove(id));
  const { addToast } = useToast();

  const onDone = () => {
    try {
      removeNotification();

      addToast({
        type: 'success',
        heading: `La notification ${code} a été supprimé avec succès.`
      });
    } catch (e) {
      addToast({
        type: 'error',
        heading: `Echec de la suppression.`
      });
    }
  };

  const removeConfirmation = useConfirmation({
    onDone,
    heading: 'Confirmation suppression',
    message: `Voulez-vous supprimer la notification ${code} ?`
  });

  return (
    <Flex gap="10px">
      <Box d="flex" alignItems="center" justifyContent="flex-start">
        {can('client.delete') && (
          <IconButton onClick={removeConfirmation} icon={<DeleteIcon />} />
        )}
        {can('client.edit') && (
          <IconButton onClick={editModal} icon={<EditIcon />} />
        )}
      </Box>

      <Box d="flex" alignItems="center" justifyContent="flex-start" w="200px">
        <span>{code}</span>
      </Box>

      <Box d="flex" alignItems="center" justifyContent="flex-start">
        <span>{description}</span>
      </Box>
    </Flex>
  );
};

export default NotificationItem;
