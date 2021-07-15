import axios from 'axios';

const allActivities = async ({ user }) => {
  try {
    const { data } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        query: `{
          data: user(where: { id: ${user} }) {
            id
            activites {
              id
              type
              type_id
              data
              user {
                id
                username
              }
            }
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return data.activites;
  } catch (_) {
    return null;
  }
};

export default allActivities;
