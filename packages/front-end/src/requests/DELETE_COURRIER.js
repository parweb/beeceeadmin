import { gql } from '@apollo/client';

const DELETE_COURRIER = gql`
  mutation deleteCourrier($id: String!) {
    deleteOneCourrier(where: { id: $id }) {
      __typename
      id
    }
  }
`;

export default DELETE_COURRIER;
