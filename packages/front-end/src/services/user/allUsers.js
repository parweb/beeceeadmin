import axios from 'axios';

const allUsers = async () => {
  try {
    const { data } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        query: `{
          data: users(orderBy: [{ id: asc }]) {
            id
            username
            state
            permissions {
              permission {
                id
                subject
                action
              }
              state
            }
            role {
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
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return data;
  } catch (_) {
    return null;
  }
};

export default allUsers;
