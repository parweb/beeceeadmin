import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Flex, Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { $position } from 'states';
import { useMutation, useConfirmation, useToast, useAccess } from 'hooks';

const PositionItem = ({ codeCourrier }) => {
  const can = useAccess();

  const { description } = useRecoilValue(
    $position.readWidthDefault(codeCourrier)
  );
  const openModal = useSetRecoilState($position.modal(codeCourrier));
  const [removePosition] = useMutation($position.remove(codeCourrier));

  const { addToast } = useToast();

  const onDone = () => {
    try {
      removePosition();

      addToast({
        type: 'success',
        heading: `La notification ${codeCourrier} a été supprimé avec succès.`
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
    message: `Voulez-vous supprimer la notification ${codeCourrier} ?`
  });

  const isDefault = codeCourrier === 'default';

  return (
    <Flex>
      <Box d="flex" alignItems="center" justifyContent="flex-start">
        {can('client.delete') && (
          <IconButton
            visibility={isDefault && 'hidden'}
            onClick={removeConfirmation}
            icon={<DeleteIcon />}
          />
        )}
        {can('client.edit') && (
          <IconButton onClick={openModal} icon={<EditIcon />} />
        )}
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
