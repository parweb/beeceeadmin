const axios = require('axios');

module.exports = (app, opts, next) => {
  app.get('/record', async (request, reply) => {
    const { dossier } = request.query;

    axios
      .get(`${process.env.API_MULSOFT}/dossier/num_doss/${dossier}`, {
        headers: {
          Authorization: `Basic ${process.env.API_MULSOFT_BASIC}`
        }
      })
      .then(({ data }) => {
        reply.code(200).send(data);
      })
      .catch(({ response }) => {
        console.error(response);
        reply.code(response.status).send(response.data);
      });
  });

  next();
};
