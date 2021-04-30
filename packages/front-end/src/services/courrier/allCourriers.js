import axios from 'axios';

const allCourriers = async url => {
  try {
    const { data } = await axios
      .post(`${url}/graphql`, {
        query: `{
          data: courriers(orderBy: [{ id: asc }]) {
            id
            name
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return data;
  } catch (_) {
    return null;
  }
};

export default allCourriers;
