import styled from 'styled-components';

const Container = styled.aside`
  background-color: #fff;
  border-right-color: #ccc;
  border-right-style: solid;
  border-right-width: 1px;
`;

const Sidebar = ({ children }) => <Container>{children}</Container>;

export default Sidebar;
