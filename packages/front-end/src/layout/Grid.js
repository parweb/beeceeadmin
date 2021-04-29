import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-rows: ${({ rows }) => rows};
  grid-template-columns: ${({ columns }) => columns};
  gap: ${({ gap = 0 }) => gap};
  grid-column: ${({ position: [from, to] = [null, null] }) =>
    from && to ? `${from} / ${to + 1}` : ''};
  row-gap: ${({ rowGap }) => rowGap};
`;

export default Grid;
