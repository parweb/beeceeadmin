const axios = require('axios');
const { nanoid } = require('nanoid');

module.exports = (app, opts, next) => {
  app.get('/clients', (request, reply) => {
    axios
      .get(process.env.API_BCA_SIGN + '/clients')
      .then(({ data }) => {
        console.log({ data });
        reply.code(200).send(
          data.map(({ callbackChannels, signPositions, ...rest }) => {
            return {
              ...rest,
              callbackChannels: callbackChannels.map(props => ({
                ...props,
                id: nanoid()
              })),
              signPositions: signPositions.map(props => ({
                ...props
                // id: nanoid()
              }))
            };
          })
        );
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response?.status ?? 500).send(response?.data ?? 'Error');
      });
  });

  app.put('/clients', (request, reply) => {
    const { id } = request.query;
    const data = request.body;

    axios
      .put(process.env.API_BCA_SIGN + '/clients/' + id, data)
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response?.status ?? 500).send(response?.data ?? 'Error');
      });
  });

  app.post('/clients', (request, reply) => {
    const data = request.body;

    axios
      .post(process.env.API_BCA_SIGN + '/clients', data)
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response?.status ?? 500).send(response?.data ?? 'Error');
      });
  });

  next();
};
