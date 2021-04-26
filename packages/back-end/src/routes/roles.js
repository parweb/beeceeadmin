const axios = require('axios');

module.exports = (app, opts, next) => {
  app.get('/roles', async (request, reply) => {
    const { mission } = request.query;

    axios
      .get(
        `${process.env.API_MULSOFT}/acteurs_dossier/num_mission/${mission}`,
        {
          headers: {
            Authorization: `Basic ${process.env.API_MULSOFT_BASIC}`
          }
        }
      )
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
