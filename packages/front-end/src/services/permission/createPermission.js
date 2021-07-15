import axios from 'axios';

const createPermission = async data => {
  try {
    const variables = {
      data: {
        ...(data.subject && { subject: data.subject }),
        ...(data.action && { action: data.action })
      }
    };

    const { data: result } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        variables,
        query: `mutation createPermission($data: PermissionCreateInput!) {
          createOnePermission(data: $data) {
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

export default createPermission;
