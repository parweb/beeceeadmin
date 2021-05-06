import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { $position } from 'states';

const PositionItem = ({ codeCourrier }) => {
  const { description } = useRecoilValue($position.read(codeCourrier));
  const openModal = useSetRecoilState($position.modal(codeCourrier));

  return (
    <Flex>
      <Box d="flex" alignItems="center" justifyContent="flex-start">
        <IconButton onClick={() => {}} icon={<DeleteIcon />} />
        <IconButton onClick={openModal} icon={<EditIcon />} />
      </Box>

      <Box d="flex" alignItems="center" justifyContent="flex-start" w="200px">
        <span>{codeCourrier}</span>
      </Box>

      <Box d="flex" alignItems="center" justifyContent="flex-start">
        <span>{description}</span>
      </Box>
    </Flex>
  );
};

export default PositionItem;
