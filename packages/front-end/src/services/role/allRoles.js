import axios from 'axios';

const allRoles = async () => {
  try {
    const { data } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        query: `{
          data: roles(orderBy: [{ id: asc }]) {
            id
            type
            permissions {
              permission {
                id
                subject
                action
              }
              state
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

export default allRoles;
