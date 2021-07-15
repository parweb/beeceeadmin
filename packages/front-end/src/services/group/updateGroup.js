import axios from 'axios';

const updateGroup = async (url, id, data) => {
  try {
    const variables = { data, where: { id } };

    if ([true, false].includes(data?.display))
      variables.data.display = { set: data.display };
    if ([true, false].includes(data?.upload))
      variables.data.upload = { set: data.upload };
    if (data?.size) variables.data.size = { set: data.size };

    if ('extension' in data) {
      if (data.extension.value === true) {
        variables.data['extensions'] = {
          connect: { id: data.extension.id }
        };
      } else {
        variables.data['extensions'] = {
          disconnect: { id: data.extension.id }
        };
      }

      delete variables.data.extension;
    }

    const { data: result } = await axios
      .post(`${url}/graphql`, {
        variables,
        query: `mutation updateGroup(
          $data: GroupUpdateInput!
          $where: GroupWhereUniqueInput!
        ) {
          updateOneGroup(data: $data, where: $where) {
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

export default updateGroup;
