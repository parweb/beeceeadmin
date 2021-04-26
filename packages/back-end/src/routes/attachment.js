const fs = require('fs');
const md5 = require('md5');
const { extname } = require('path');
const { contentType } = require('mime-types');

const path = process.env.PATH_TMP || '/app/tmp/';

module.exports = (app, opts, next) => {
  app.get('/attachment', (request, reply) => {
    try {
      const input = `${process.env.API_PREVIEW}${request.url}`.replace(
        '/doc-num-front/api/doc-num-front/api',
        '/doc-num-front/api'
      );

      const cacheKey = md5(input);

      const stream = fs.readFileSync(path + cacheKey);

      const type = contentType(extname(input));

      reply.type(type);
      reply.send(stream);
    } catch (error) {
      console.error(error);
      reply
        .code(error?.response?.status ?? 500)
        .send(error?.response?.data ?? 'something went wrong');
    }
  });

  next();
};
