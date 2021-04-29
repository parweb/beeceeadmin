import axios from 'axios';

const removeService = async id => {
  try {
    const variables = {
      where: { id }
    };

    const { data: result } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        variables,
        query: `mutation removeService($where: ServiceWhereUniqueInput!) {
          deleteOneService(where: $where) {
            id
            name
            url
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return result;
  } catch (_) {
    return null;
  }
};

export default removeService;
