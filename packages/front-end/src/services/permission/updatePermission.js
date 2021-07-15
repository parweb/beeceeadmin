import axios from 'axios';

const updatePermission = async (id, data) => {
  try {
    const variables = {
      data: {
        ...(data.type && { type: { set: data.type } }),
        ...([true, false].includes(data.state) && {
          state: { set: data.state }
        })
      },
      where: { id }
    };

    const { data: result } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        variables,
        query: `mutation updatePermission(
          $data: PermissionUpdateInput!
          $where: PermissionWhereUniqueInput!
        ) {
          updateOnePermission(data: $data, where: $where) {
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

export default updatePermission;
