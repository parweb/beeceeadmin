import { useMutation } from '@apollo/client';
import { Button } from '@salesforce/design-system-react';
import { useConfirmation, useToast } from 'hooks';

import { DELETE_EXTENSIONS_FROM_GROUP } from 'requests';

const GroupExtensionList = ({ groupId, id, name, description }) => {
  const [deleteExtensionFromGroup] = useMutation(DELETE_EXTENSIONS_FROM_GROUP);
  const { addToast } = useToast();

  const onDone = async () => {
    try {
      await deleteExtensionFromGroup({
        variables: { extensionId: id, groupId }
      });

      addToast({
        type: 'success',
        heading: `L'extension ${name} a été supprimé avec succès.`
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
    message: `Voulez-vous supprimer l'extension ${name} - ${description} ?`
  });

  return (
    <li>
      <form
        style={{
          margin: '5px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}
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
        <span>
          {name} - {description}
        </span>
      </form>
    </li>
  );
};

export default GroupExtensionList;
