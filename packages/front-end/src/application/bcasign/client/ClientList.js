import { useRecoilValue } from 'recoil';
import { GrAdd } from 'react-icons/gr';
import { Box } from '@chakra-ui/react';

import { $client } from 'states';
import { useMutation, useAccess } from 'hooks';
import { Button } from 'layout';
import { BcasignClientItem } from 'application';

const ClientList = () => {
  const can = useAccess();

  const clients = useRecoilValue($client.list);
  const [createClient] = useMutation($client.create);

  return (
    <>
      <Box m={1}>
        {can('client.add') && (
          <Button
            onClick={() => {
              const id = prompt('Code client ?');
              createClient({ id });
            }}
            isFullWidth
            leftIcon={<GrAdd />}
            variant="solid"
          >
            Ajouter un client
          </Button>
        )}
      </Box>

      <ul>
        {clients.map(({ id: name }) => (
          <BcasignClientItem key={`BcasignClientItem-${name}`} {...{ name }} />
        ))}
      </ul>
    </>
  );
};

export default ClientList;
