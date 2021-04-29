import axios from 'axios';

const createService = async data => {
  try {
    const variables = { data };

    if ('environnement' in data) {
      variables.data['environnement'] = {
        connect: { id: data.environnement }
      };
    }

    const { data: result } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        variables,
        query: `mutation createService($data: ServiceCreateInput!) {
          createOneService(data: $data) {
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

export default createService;
