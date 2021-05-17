const axios = require('axios');
const { nanoid } = require('nanoid');

const getService = require('../helpers/getService');

module.exports = (app, opts, next) => {
  app.get('/clients', async (request, reply) => {
    const { environnement } = request.query;
    const service = await getService(environnement, 'bca-sign');

    axios
      .get(service.url + '/clients')
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

  app.put('/clients', async (request, reply) => {
    const { id } = request.query;
    const data = request.body;

    const { environnement } = request.query;
    const service = await getService(environnement, 'bca-sign');

    axios
      .put(service.url + '/clients/' + id, data)
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response?.status ?? 500).send(response?.data ?? 'Error');
      });
  });

  app.post('/clients', async (request, reply) => {
    const data = request.body;

    const { environnement } = request.query;
    const service = await getService(environnement, 'bca-sign');

    axios
      .post(service.url + '/clients', data)
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
