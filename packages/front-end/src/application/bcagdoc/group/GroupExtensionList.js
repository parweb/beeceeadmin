// import { useMutation } from '@apollo/client';
import { Button } from '@salesforce/design-system-react';

import { useConfirmation, useToast, useAccess, useMutation } from 'hooks';
import { $group } from 'states';

const GroupExtensionList = ({ groupId, id, name, description }) => {
  const can = useAccess();
  // const [deleteExtensionFromGroup] = useMutation(DELETE_EXTENSIONS_FROM_GROUP);
  const [updateGroup] = useMutation($group.update(groupId));
  const { addToast } = useToast();

  const onDone = async () => {
    try {
      await updateGroup({
        extension: { value: false, id }
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
        {can('extension.delete') && (
          <Button
            type="submit"
            iconCategory="utility"
            iconSize="medium"
            variant="icon"
            iconName="delete"
          />
        )}

        <span>
          {name} - {description}
        </span>
      </form>
    </li>
  );
};

export default GroupExtensionList;
