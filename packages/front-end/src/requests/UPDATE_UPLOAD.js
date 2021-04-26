import { gql } from '@apollo/client';

const UPDATE_UPLOAD = gql`
  mutation updateUpload($groupId: Int!, $value: Boolean!) {
    updateOneGroup(data: { upload: { set: $value } }, where: { id: $groupId }) {
      __typename
      id
      upload
    }
  }
`;

export default UPDATE_UPLOAD;
