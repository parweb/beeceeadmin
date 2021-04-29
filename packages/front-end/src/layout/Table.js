import { Table as TableUi, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import styled from 'styled-components';

const StyledTable = styled(TableUi)`
  border: ${props => (props.gutter ? '1px solid blue' : '')};

  Th,
  Tr,
  Td {
    border: ${props => (props.gutter ? '1px solid blue' : '')};
  }

  Tbody Tr:hover {
    background: #e9edfc;
  }

  Tbody Td {
    padding: 7.5px 10px;
  }
`;

const Table = ({ children, columns }) => {
  return (
    <StyledTable variant="simple">
      <Thead>
        <Tr>
          {columns?.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>{children}</Tbody>
    </StyledTable>
  );
};

export default Table;
