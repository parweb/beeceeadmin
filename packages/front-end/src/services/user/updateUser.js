import axios from 'axios';

const updateUser = async (id, data) => {
  try {
    const variables = {
      where: { id },
      data: {
        ...('role' in data && {
          role:
            typeof data.role === 'undefined'
              ? { disconnect: true }
              : { connect: { id: data.role.id } }
        }),
        ...(data.username && { username: { set: data.username } }),
        ...([true, false].includes(data.state) && {
          state: { set: data.state }
        }),
        ...(data.permission && {
          permissions: {
            upsert: {
              where: {
                permission_id_user_id: {
                  permission_id: data.permission.id,
                  user_id: id
                }
              },
              create: {
                state: data.permission.value,
                permission: { connect: { id: data.permission.id } }
              },
              update: { state: { set: data.permission.value } }
            }
          }
        })
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

export default updateUser;
