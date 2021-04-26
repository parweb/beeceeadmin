import { gql } from '@apollo/client';

const DELETE_EXTENSIONS_FROM_GROUP = gql`
  mutation deleteExtensionFromGroup($extensionId: Int!, $groupId: Int!) {
    updateOneGroup(
      data: { extensions: { disconnect: { id: $extensionId } } }
      where: { id: $groupId }
    ) {
      __typename
      id
    }
  }
`;

export default DELETE_EXTENSIONS_FROM_GROUP;
