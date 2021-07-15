import { useRecoilState, useSetRecoilState } from 'recoil';
import { Link } from 'react-router-dom';

import {
  Menu,
  MenuList,
  MenuDivider,
  MenuItem,
  MenuButton,
  Button,
  Avatar
} from '@chakra-ui/react';

import { $auth, $activity } from 'states';

const UserMenu = () => {
  const [auth, setAuth] = useRecoilState($auth);
  const showActivityModal = useSetRecoilState($activity.modal);

  if (!auth.isAuthenticated) {
    return (
      <Link to="/auth/login">
        <Button as="a">login</Button>
      </Link>
    );
  }

  return (
    <Menu>
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
        <Avatar name={auth.username} size="sm" />
      </MenuButton>
      <MenuList>
        <MenuItem>Profil</MenuItem>
        <MenuItem onClick={showActivityModal}>Activités</MenuItem>

        <MenuDivider />
        <MenuItem onClick={() => setAuth({ isAuthenticated: false })}>
          Deconnecter
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
