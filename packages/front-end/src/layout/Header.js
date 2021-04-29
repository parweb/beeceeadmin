import { useRecoilState } from 'recoil';
import { useHistory, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

import { $user } from 'states';
import { Button } from 'layout';

const logos = {
  Assure: process.env.PUBLIC_URL + '/logo_assure.png',
  Client: process.env.PUBLIC_URL + '/logo_client.png',
  Reparateur: process.env.PUBLIC_URL + '/logo_reparateur.png',
  default: process.env.PUBLIC_URL + '/logo.png'
};

const menus = {
  Assure: [
    { label: 'ACCUEIL', url: '/' },
    { label: 'AIDE EN LIGNE', url: '/help' }
  ],
  Client: [
    { label: 'ACCUEIL', url: '/' },
    { label: 'JOURS DE PASSAGE', url: '/meeting' },
    { label: 'AGENCES BCA', url: '/bca' },
    { label: 'AIDE', url: '/help' }
  ],
  Reparateur: [
    { label: 'ACCUEIL', url: '/' },
    { label: 'PROFIL', url: '/profil' },
    { label: 'AIDE EN LIGNE', url: '/help' }
  ],
  default: []
};

const HeaderContainer = styled.header`
  z-index: 100;
  top: 0px;
  position: sticky;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #d2d2d2;
  align-items: center;
  background: #0b519f;
`;

const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
`;

const MenuItem = styled.li`
  list-style: none;
  text-transform: uppercase;
  color: #2c3e50;
  font-family: Arial;
  font-size: 12px;

  letter-spacing: 1.2px;

  a {
    font-size: 18px;
    flex: auto;

    color: ${({ active }) => (active ? 'black' : 'white')};
    background: ${({ active }) => (active ? 'white' : 'transparent')};
    letter-spacing: 0px;
    position: relative;
    padding: 12px 20px;
    line-height: 1.3;
    text-decoration: none;
    border-radius: 4px;
  }
`;

const Header = () => {
  const [user, setUser] = useRecoilState($user);

  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    setUser({ isAuthenticated: false });
    history.push('/');
  };

  return (
    <HeaderContainer>
      <div
        style={{
          background: `url(${logos.default}) center center / contain no-repeat #fff`,
          height: '50px',
          width: '50px',
          borderRadius: '50%',
          boxShadow: '#fff 0px 0px 0px 0px',
          overflow: 'hidden'
        }}
      ></div>

      {user?.isAuthenticated && (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <MenuContainer>
            {menus[user.profil].map(({ label, url }) => (
              <MenuItem
                key={`${user.profil}-${label}`}
                active={url === location.pathname}
              >
                <Link to={url}>{label}</Link>
              </MenuItem>
            ))}
          </MenuContainer>

          <Button onClick={handleLogout} type="submit">
            Déconnexion
          </Button>
          <div
            style={{
              background: `url(${
                logos[user.profil]
              }) center center / contain no-repeat #fff`,
              height: '50px',
              width: '50px',
              borderRadius: '50%',
              boxShadow: '#fff 0px 0px 0px 0px',
              overflow: 'hidden'
            }}
          ></div>
        </div>
      )}
    </HeaderContainer>
  );
};

export default Header;
