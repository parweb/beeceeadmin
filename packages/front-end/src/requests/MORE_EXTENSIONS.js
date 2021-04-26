import { gql } from '@apollo/client';

const MORE_EXTENSIONS = gql`
  query($groupId: Int!) {
    extensions(
      where: { group_id: { equals: $groupId } }
      orderBy: [{ id: asc }]
    ) {
      id
      name
      description
    }
  }
`;

export default MORE_EXTENSIONS;
