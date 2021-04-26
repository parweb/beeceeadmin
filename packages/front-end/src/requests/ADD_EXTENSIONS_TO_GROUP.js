import { gql } from '@apollo/client';

const ADD_EXTENSIONS_TO_GROUP = gql`
  mutation addExtensionToGroup($extensionId: Int!, $groupId: Int!) {
    updateOneGroup(
      data: { extensions: { connect: { id: $extensionId } } }
      where: { id: $groupId }
    ) {
      __typename
      id
    }
  }
`;

export default ADD_EXTENSIONS_TO_GROUP;
