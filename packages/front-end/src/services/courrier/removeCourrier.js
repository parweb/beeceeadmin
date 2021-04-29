import axios from 'axios';

const removeCourrier = async id => {
  try {
    const variables = {
      where: { id }
    };

    const { data: result } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
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
