import axios from 'axios';

const updateRole = async (id, data) => {
  try {
    const variables = {
      where: { id },
      data: {
        ...(data.type && { type: { set: data.type } }),
        ...([true, false].includes(data.state) && {
          state: { set: data.state }
        }),
        ...(data.permission && {
          permissions: {
            upsert: {
              where: {
                permission_id_role_id: {
                  permission_id: data.permission.id,
                  role_id: id
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
        query: `mutation updateRole(
          $data: RoleUpdateInput!
          $where: RoleWhereUniqueInput!
        ) {
          updateOneRole(data: $data, where: $where) {
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

export default updateRole;
