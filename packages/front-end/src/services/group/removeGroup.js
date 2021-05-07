import axios from 'axios';

const removeGroup = async (url, id) => {
  try {
    const variables = {
      where: { id }
    };

    const { data: result } = await axios
      .post(`${url}/graphql`, {
        variables,
        query: `mutation removeGroup($where: GroupWhereUniqueInput!) {
          deleteOneGroup(where: $where) {
            id
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return result;
  } catch (_) {
    return null;
  }
};

export default removeGroup;
