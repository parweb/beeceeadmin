import { gql } from '@apollo/client';

const EXTENSIONS = gql`
  query {
    extensions(orderBy: [{ id: asc }]) {
      id
      name
      description
    }
  }
`;

export default EXTENSIONS;
