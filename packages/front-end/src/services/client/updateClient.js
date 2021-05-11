import axios from 'axios';

const updateClient = async (url, id, data) => {
  try {
    const client = Object.entries(data).reduce((carry, [key, value]) => {
      if (key === 'signPositions') {
        carry['defaultSignPosition'] = value.find(
          ({ codeCourrier }) => codeCourrier === 'default'
        ).positions[0];

        return {
          ...carry,
          [key]: value.filter(({ codeCourrier }) => codeCourrier !== 'default')
        };
      }

      if (key === 'callbackChannels') {
        return {
          ...carry,
          [key]: value.map(props =>
            Object.fromEntries(
              Object.entries(props).filter(([key]) => key !== 'id')
            )
          )
        };
      }

      return { ...carry, [key]: value };
    }, {});

    await axios.put(`${url}/clients?id=${id}`, client);
  } catch (_) {
    return null;
  }
};

export default updateClient;
