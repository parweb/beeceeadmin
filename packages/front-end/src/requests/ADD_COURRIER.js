import { gql } from '@apollo/client';

const ADD_COURRIER = gql`
  mutation addCourrier($id: String!, $name: String!) {
    createOneCourrier(data: { id: $id, name: $name }) {
      __typename
      id
      name
    }
  }
`;

export default ADD_COURRIER;
