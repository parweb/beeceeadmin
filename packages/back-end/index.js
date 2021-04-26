require('dotenv').config();

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const path = require('path');
const autoload = require('fastify-autoload');
const apollo = require('./src/graphql/apollo');

const app = require('fastify')({
  logger: { prettyPrint: true },
  ignoreTrailingSlash: true
});

const prefix = process.env.NAMESPACE || '';
app.log.info(`Prefix is: ${prefix}`);

app.register(require('fastify-routes'));
app.register(require('fastify-file-upload'));
app.register(require('fastify-cors'));
app.register(autoload, {
  dir: path.join(__dirname, 'src', 'routes'),
  options: { prefix }
});
app.register(apollo.createHandler({ path: prefix + '/graphql' }));

if (cluster.isMaster) {
  app.log.info(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    app.log.info(`worker ${worker.process.pid} died`);
    app.log.info({ worker, code, signal });
  });
} else {
  (async () => {
    try {
      await app.listen(3500, '0.0.0.0');
      console.log(app.routes);
    } catch (err) {
      app.log.error(err);
    }
  })();

  app.log.info(`Worker ${process.pid} started`);
}
