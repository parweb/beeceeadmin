import { useMutation } from '@apollo/client';
import { Button } from '@salesforce/design-system-react';

import { useConfirmation, useToast } from 'hooks';
import { DELETE_COURRIER, COURRIERS } from 'requests';

const CourrierActionDelete = ({ courrierId, name }) => {
  const [deleteCourrier] = useMutation(DELETE_COURRIER, {
    refetchQueries: [{ query: COURRIERS }]
  });
  const { addToast } = useToast();
  const onDone = async () => {
    try {
      await deleteCourrier({ variables: { id: courrierId.toString() } });

      addToast({
        type: 'success',
        heading: `Le code courrier ${name} a été supprimé avec succès .`
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
    message: `Voulez-vous supprimer le code courrier ${name} ?`
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

export default CourrierActionDelete;
