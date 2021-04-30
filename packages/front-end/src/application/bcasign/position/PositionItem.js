import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { $position } from 'states';

const PositionItem = ({ codeCourrier }) => {
  const { description } = useRecoilValue($position.read(codeCourrier));
  const openModal = useSetRecoilState($position.modal(codeCourrier));

  return (
    <Flex>
      <Box w="200px">
        <span>{codeCourrier}</span>
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

export default PositionItem;
