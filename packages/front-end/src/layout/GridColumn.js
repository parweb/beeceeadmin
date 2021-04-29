import styled from 'styled-components';

const GridColumn = styled.div`
  grid-column: ${({ position: [from, to] }) => `${from} / ${to + 1}`};
`;

export default GridColumn;
