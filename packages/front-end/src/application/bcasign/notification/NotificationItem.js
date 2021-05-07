import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { $notification } from 'states';
import { useMutation } from 'hooks';

const NotificationItem = ({ id }) => {
  const { code, description } = useRecoilValue($notification.read(id));
  const openModal = useSetRecoilState($notification.modal(id));
  const [removeNotification] = useMutation($notification.remove(id));

  return (
    <Flex gap="10px">
      <Box d="flex" alignItems="center" justifyContent="flex-start">
        <IconButton onClick={removeNotification} icon={<DeleteIcon />} />
        <IconButton onClick={openModal} icon={<EditIcon />} />
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
