import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { $application } from 'states';

const Link = styled(NavLink)`
  flex: 1;
  padding: 5px 10px;
  text-decoration: none;

  &.active {
    color: blue;
    background: #ccc;
  }
`;

const ApplicationItem = ({ id }) => {
  const { name } = useRecoilValue($application.read(id));

  return (
    <li
      style={{
        display: 'flex',
        gap: '5px',
        textDecoration: 'none',

        cursor: 'pointer',
        justifyContent: 'space-between'
      }}
    >
      <Link to={`/application/${id}/`}>{name}</Link>
    </li>
  );
};

export default ApplicationItem;
