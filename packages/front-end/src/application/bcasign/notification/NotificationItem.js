import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { $notification } from 'states';

const NotificationItem = ({ code }) => {
  const { description } = useRecoilValue($notification.read(code));
  const openModal = useSetRecoilState($notification.modal(code));

  return (
    <Flex gap="10px">
      <Box d="flex" alignItems="center" justifyContent="flex-start">
        <IconButton onClick={() => {}} icon={<DeleteIcon />} />
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
