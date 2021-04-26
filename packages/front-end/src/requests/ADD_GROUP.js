import { gql } from '@apollo/client';

const ADD_GROUP = gql`
  mutation addGroup($name: String!) {
    createOneGroup(data: { name: $name }) {
      __typename
      id
      name
    }
  }
`;

export default ADD_GROUP;
