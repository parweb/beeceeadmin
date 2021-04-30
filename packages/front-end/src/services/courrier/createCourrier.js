import axios from 'axios';

const createCourrier = async (url, data) => {
  try {
    const variables = { data };

    const { data: result } = await axios
      .post(`${url}/graphql`, {
        variables,
        query: `mutation createCourrier($data: CourrierCreateInput!) {
          createOneCourrier(data: $data) {
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

export default createCourrier;
