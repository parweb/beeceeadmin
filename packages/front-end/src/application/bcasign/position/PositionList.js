import { useRecoilValue } from 'recoil';
import { GrAdd } from 'react-icons/gr';
import produce from 'immer';

import { $client } from 'states';
import { BcasignPositionItem } from 'application';
import { Button } from 'layout';
import { useMutation, useAccess } from 'hooks';

const PositionList = ({ clientId }) => {
  const can = useAccess();

  const client = useRecoilValue($client.readWidthDefault(clientId));
  const [updateClient] = useMutation($client.update(clientId));

  return (
    <>
      {can('client.add') && (
        <Button
          onClick={() => {
            const codeCourrier = prompt('Code courrier ?');

            updateClient(
              produce(client, draft => {
                draft.signPositions.push({
                  codeCourrier,
                  positions: []
                });
              })
            );
          }}
          leftIcon={<GrAdd />}
          variant="solid"
        >
          Ajouter une position
        </Button>
      )}

      <hr />

      {client?.signPositions?.map(({ codeCourrier }) => (
        <BcasignPositionItem
          key={`BcasignPositionItem-${codeCourrier}`}
          codeCourrier={codeCourrier}
        />
      ))}
    </>
  );
};

export default PositionList;
