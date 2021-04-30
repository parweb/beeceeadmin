import axios from 'axios';

const removeCourrier = async (url, id) => {
  try {
    const variables = {
      where: { id }
    };

    const { data: result } = await axios
      .post(`${url}/graphql`, {
        variables,
        query: `mutation removeCourrier($where: CourrierWhereUniqueInput!) {
          deleteOneCourrier(where: $where) {
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

export default removeCourrier;
