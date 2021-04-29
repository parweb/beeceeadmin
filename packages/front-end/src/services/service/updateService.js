import axios from 'axios';

const updateService = async (id, data) => {
  try {
    const variables = {
      data: {
        name: { set: data.name },
        url: { set: data.url }
      },
      where: { id }
    };

    const { data: result } = await axios
      .post(`${process.env.REACT_APP_API}/graphql`, {
        variables,
        query: `mutation updateService(
          $data: ServiceUpdateInput!
          $where: ServiceWhereUniqueInput!
        ) {
          updateOneService(data: $data, where: $where) {
            id
            name
            url
          }
        }`
      })
      .then(({ data: { data } }) => data ?? []);

    return result;
  } catch (_) {
    return null;
  }
};

export default updateService;
