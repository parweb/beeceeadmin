import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { GrClone } from 'react-icons/gr';
import { AiOutlineMore } from 'react-icons/ai';

import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';

import { $client } from 'states';
import { useMutation, useAccess } from 'hooks';

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

const ClientItemUi = styled.li`
  & button {
    visibility: hidden;
  }

  &:hover {
    button {
      visibility: visible;
    }
  }
`;

const ClientItem = ({ name }) => {
  const can = useAccess();
  const [duplicateClient] = useMutation($client.duplicate(name));

  return (
    <ClientItemUi>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to={`/application/bcasign/clients/${name}`}>{name}</Link>

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<AiOutlineMore />}
            variant="link"
          />
          <MenuList>
            {can('client.edit') && (
              <MenuItem
                onClick={() => {
                  const id = prompt('Nouveau code client ?');
                  duplicateClient({ id });
                }}
                icon={<GrClone />}
              >
                Dupliquer
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      </div>
    </ClientItemUi>
  );
};

export default ClientItem;
