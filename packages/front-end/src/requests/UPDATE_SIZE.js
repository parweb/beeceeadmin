import { gql } from '@apollo/client';

const UPDATE_SIZE = gql`
  mutation updateSize($groupId: Int!, $value: Int!) {
    updateOneGroup(data: { size: { set: $value } }, where: { id: $groupId }) {
      __typename
      id
      size
    }
  }
`;

export default UPDATE_SIZE;
