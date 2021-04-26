const axios = require('axios');

module.exports = (app, opts, next) => {
  app.post('/auth/login', (request, reply) => {
    const { username, password } = request.body;

    axios
      .post(process.env.API_AUTH + '/oauth', {
        id: username,
        pwd: password
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
