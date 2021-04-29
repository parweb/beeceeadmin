import styled from 'styled-components';

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter
} from 'react-icons/fa';

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #0b519f;
  color: #fff;
  width: 100%;

  ul {
    display: flex;
    gap: 10px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    background-color: white;
    border-radius: 50px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  li:hover {
    background-color: #d4d4d4;
  }

  a {
    font-size: 17px;
    color: #215193;
  }
`;

const menu = [
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/bca-expertise/',
    icon: <FaLinkedinIn />
  },
  {
    id: 'twitter',
    href: 'https://twitter.com/BCA_Expertise',
    icon: <FaTwitter />
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/bca_expertise/',
    icon: <FaInstagram />
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/BCAexpertisefrance/',
    icon: <FaFacebookF />
  }
];

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <ul>
          {menu.map(({ id, href, icon }) => (
            <li key={`Footer-Menu-${id}`}>
              <a href={href} target="_blank" rel="noreferrer">
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <center>Extranet - V_VERSION_</center>
    </StyledFooter>
  );
};

export default Footer;
