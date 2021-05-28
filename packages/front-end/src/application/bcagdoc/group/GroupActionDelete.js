import { Button } from '@salesforce/design-system-react';

import { useConfirmation, useToast, useMutation } from 'hooks';
import { $group } from 'states';

const GroupActionDelete = ({ groupId, name }) => {
  const [removeGroup] = useMutation($group.remove(groupId));
  const { addToast } = useToast();

  const onDone = async () => {
    try {
      await removeGroup();

      addToast({
        type: 'success',
        heading: `Le groupe ${name} a été supprimé avec succès.`
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
        iconSize="medium"
        variant="icon"
        iconName="delete"
      />
    </form>
  );
};

export default GroupActionDelete;
