import axios from 'axios';

const allExtensions = async url => {
  try {
    const { data } = await axios
      .post(`${url}/graphql`, {
        query: `{
          data: extensions(orderBy: [{ id: asc }]) {
            id
            name
            description
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return data;
  } catch (_) {
    return null;
  }
};

export default allExtensions;
