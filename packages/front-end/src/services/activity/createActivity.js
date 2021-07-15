import axios from 'axios';

const createActivity = async (type, type_id, data = {}, user_id = null) => {
  try {
    if (user_id === null) {
      const user = JSON.parse(localStorage.getItem('auth'));
      user_id = user.id;
    }

    const variables = {
      where: { id: user_id },
      data: {
        activites: {
          create: {
            type,
            type_id: type_id ? String(type_id) : null,
            data
          }
        }
      }
    };

    const { data: result } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        variables,
        query: `mutation updateUser(
          $data: UserUpdateInput!
          $where: UserWhereUniqueInput!
        ) {
          updateOneUser(data: $data, where: $where) {
            id
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return result;
  } catch (_) {
    return null;
  }
};

export default createActivity;
