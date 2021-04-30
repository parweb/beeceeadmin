import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { $notification } from 'states';

const NotificationItem = ({ code }) => {
  const { description } = useRecoilValue($notification.read(code));
  const openModal = useSetRecoilState($notification.modal(code));

  return (
    <Flex>
      <Box w="200px">
        <span>{code}</span>
      </Box>
      <Box>
        <span>{description}</span>
      </Box>
      <Box>
        <IconButton onClick={() => {}} icon={<DeleteIcon />} />
        <IconButton onClick={openModal} icon={<EditIcon />} />
      </Box>
    </Flex>
  );
};

export default NotificationItem;
