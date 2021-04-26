import { gql } from '@apollo/client';

const COURRIERS = gql`
  query {
    courriers(orderBy: [{ id: asc }]) {
      id
      name
    }
  }
`;

export default COURRIERS;
