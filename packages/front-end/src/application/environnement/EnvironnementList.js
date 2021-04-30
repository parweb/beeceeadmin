import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { ChevronDownIcon, SettingsIcon, CheckIcon } from '@chakra-ui/icons';

import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider
} from '@chakra-ui/react';

import { $environnement } from 'states';

const EnvironnementList = () => {
  const openModal = useSetRecoilState($environnement.modal);
  const [selected, selectEnvironnement] = useRecoilState(
    $environnement.selected
  );
  const environnements = useRecoilValue($environnement.list);

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {environnements?.find(({ id }) => id === selected)?.name ??
          'aucun environnements'}
      </MenuButton>

      <MenuList>
        {environnements?.map(({ id, name }) => (
          <MenuItem
            key={`EnvironnementItem-${id}`}
            onClick={() => selectEnvironnement(id)}
            icon={
              <CheckIcon visibility={selected === id ? 'visible' : 'hidden'} />
            }
          >
            {name}
          </MenuItem>
        ))}

        <MenuDivider />

        <MenuItem onClick={openModal} icon={<SettingsIcon />}>
          Configurer
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default EnvironnementList;
