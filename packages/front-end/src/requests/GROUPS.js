import { gql } from '@apollo/client';

const GROUPS = gql`
  query {
    groups(orderBy: [{ id: asc }]) {
      id
      name
      display
      upload
      size
      extensions(orderBy: [{ id: asc }]) {
        id
        name
        description
      }
    }
  }
`;

export default GROUPS;
