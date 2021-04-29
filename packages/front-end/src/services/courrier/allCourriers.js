import axios from 'axios';

const allCourriers = async () => {
  try {
    const { data } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
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
