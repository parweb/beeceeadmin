const axios = require('axios');

module.exports = (app, opts, next) => {
  app.get('/clients', (request, reply) => {
    axios
      .get(process.env.API_BCA_SIGN + '/clients')
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
