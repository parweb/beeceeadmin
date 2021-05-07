import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { $position } from 'states';
import { useMutation } from 'hooks';

const PositionItem = ({ codeCourrier }) => {
  const { description } = useRecoilValue(
    $position.readWidthDefault(codeCourrier)
  );
  const openModal = useSetRecoilState($position.modal(codeCourrier));
  const [removePosition] = useMutation($position.remove(codeCourrier));

  const isDefault = codeCourrier === 'default';

  return (
    <Flex>
      <Box d="flex" alignItems="center" justifyContent="flex-start">
        <IconButton
          visibility={isDefault && 'hidden'}
          onClick={removePosition}
          icon={<DeleteIcon />}
        />
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
