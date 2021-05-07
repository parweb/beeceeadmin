import axios from 'axios';

const createGroup = async (url, data) => {
  try {
    const variables = { data };

    const { data: result } = await axios
      .post(`${url}/graphql`, {
        variables,
        query: `mutation createGroup($data: GroupCreateInput!) {
          createOneGroup(data: $data) {
            id
            name
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return result;
  } catch (_) {
    return null;
  }
};

export default createGroup;
