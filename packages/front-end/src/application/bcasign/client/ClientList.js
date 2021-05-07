import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

import { $client } from 'states';
import { useMutation } from 'hooks';
import { Button } from 'layout';

const Link = styled(NavLink)`
  transition: all 1s ease;
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  padding: 5px 10px;
  text-decoration: none;
  color: grey;
  transition: all 1s ease;

  &::before {
    content: '';

    display: block;
    background-color: transparent;
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }

  &.active {
    color: black;
    text-decoration: none;

    &::before {
      background-color: black;
    }
  }
`;

const ClientList = () => {
  const clients = useRecoilValue($client.list);
  const [createClient] = useMutation($client.create);

  return (
    <>
      <Box m={1}>
        <Button
          onClick={() => createClient()}
          isFullWidth
          leftIcon={<GrAdd />}
          variant="solid"
        >
          Ajouter un client
        </Button>
      </Box>

      <ul>
        {clients.map(({ id: name }) => (
          <li key={`ClientItem-${name}`}>
            <Link to={`/application/bcasign/clients/${name}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ClientList;
