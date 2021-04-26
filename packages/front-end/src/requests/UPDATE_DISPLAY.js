import { gql } from '@apollo/client';

const UPDATE_DISPLAY = gql`
  mutation updateDisplay($groupId: Int!, $value: Boolean!) {
    updateOneGroup(
      data: { display: { set: $value } }
      where: { id: $groupId }
    ) {
      __typename
      id
      display
    }
  }
`;

export default UPDATE_DISPLAY;
