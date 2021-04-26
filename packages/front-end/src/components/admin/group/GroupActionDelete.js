import { useMutation } from '@apollo/client';
import { Button } from '@salesforce/design-system-react';

import { useConfirmation, useToast } from 'hooks';
import { DELETE_GROUP, GROUPS } from 'requests';

const GroupActionDelete = ({ groupId, name }) => {
  const [deleteGroup] = useMutation(DELETE_GROUP, {
    refetchQueries: [{ query: GROUPS }]
  });
  const { addToast } = useToast();
  const onDone = async () => {
    try {
      await deleteGroup({ variables: { id: groupId } });

      addToast({
        type: 'success',
        heading: `Le groupe ${name}  a été supprimé avec succès .`
      });
    } catch (e) {
      addToast({
        type: 'error',
        heading: `Echec de la suppression.`
      });
    }
  };

  const openConfirmation = useConfirmation({
    onDone,
    heading: 'Confirmation suppression',
    message: `Voulez-vous supprimer le groupe ${name} ?`
  });

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        openConfirmation();
      }}
    >
      <Button
        type="submit"
        iconCategory="utility"
        iconSize="meduim"
        variant="icon"
        iconName="delete"
      />
    </form>
  );
};

export default GroupActionDelete;
