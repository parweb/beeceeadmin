import axios from 'axios';

const allExtensions = async () => {
  try {
    const { data } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
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
