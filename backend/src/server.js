const logger = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const mount = require('koa-mount');
const serve = require('koa-static');
const path = require('path');

const {notFound, unauthorized} = require('src/middleware/notFound');
const {handleException} = require('src/middleware/exception.middleware');
const app = require('./app');
const {sequelize} = require('../models');
const router = require('./routes');

const serverPort = process.env.PORT || 3200;
const serverHost = process.env.HOST || '0.0.0.0';

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});

app.use(logger('tiny'));

app.use(handleException);

app.use(bodyParser({
  enableTypes: ['json', 'form'],
  extendTypes: {
    json: ['application/json'], // will parse application/x-javascript type body as a JSON string
  },
  onerror(err, ctx) {
    ctx.throw('body parse error', 422);
  },
}));

app.use(serve(path.basename('./public')));
app.use(unauthorized);

app.use(router.routes());
app.use(router.allowedMethods());

app.use(mount('/', serve('./public')));

app.use(notFound);

app.on('error', (err) => {
  console.error('Error server', err);
});

let server;

sequelize.sync()
  .then(() => {
    server = app.listen(serverPort, serverHost, async () => {
      console.log('Listening on port %d', serverPort);
    });
  });

console.log(`Run server on  http://${serverHost}:${serverPort}`);

exports.closeServer = () => {
  server.close();
};
