import axios from 'axios';

const allPermissions = async () => {
  try {
    const { data } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        query: `{
          data: permissions(orderBy: [{ id: asc }]) {
            id
            subject
            action
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return data;
  } catch (_) {
    return null;
  }
};

export default allPermissions;
