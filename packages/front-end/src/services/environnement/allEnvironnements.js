import axios from 'axios';

const allEnvironnements = async () => {
  try {
    const { data } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        query: `{
          data: environnements(orderBy: [{ id: asc }]) {
            id
            name
            services(orderBy: [{ id: asc }]) {
              id
              name
              url
              environnement {
                name
              }
            }
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return data;
  } catch (_) {
    return null;
  }
};

export default allEnvironnements;
