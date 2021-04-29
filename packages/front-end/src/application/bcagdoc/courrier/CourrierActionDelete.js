import { Button } from '@salesforce/design-system-react';

import { useConfirmation, useToast, useMutation } from 'hooks';
import { $courrier } from 'states';

const CourrierActionDelete = ({ courrierId, name }) => {
  const [removeCourrier] = useMutation($courrier.remove(courrierId));
  const { addToast } = useToast();

  const onDone = async () => {
    try {
      await removeCourrier();

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
        iconSize="medium"
        variant="icon"
        iconName="delete"
      />
    </form>
  );
};

export default CourrierActionDelete;
