import axios from 'axios';

const allGroups = async () => {
  try {
    const { data } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        query: `{
          data: groups(orderBy: [{ id: asc }]) {
            id
            name
            display
            upload
            size
            extensions(orderBy: [{ id: asc }]) {
              id
              name
              description
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

export default allGroups;
