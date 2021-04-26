import { gql } from '@apollo/client';

const DELETE_GROUP = gql`
  mutation deleteGroup($id: Int!) {
    deleteOneGroup(where: { id: $id }) {
      __typename
      id
    }
  }
`;

export default DELETE_GROUP;
