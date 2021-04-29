import axios from 'axios';

const removeGroup = async id => {
  try {
    const variables = {
      where: { id }
    };

    const { data: result } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        variables,
        query: `mutation removeGroup($where: GroupWhereUniqueInput!) {
          deleteOneGroup(where: $where) {
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

export default removeGroup;
