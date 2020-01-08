const Router = require('koa-router');
const {createReadStream} = require('fs');
const path = require('path');

const post = require('./post');
const comments = require('./comments');
const auth = require('./auth');
const user = require('./user');

let router = new Router();

router = comments(router);
router = post(router);
router = auth(router);
router = user(router);

router.get('/second_route', async (ctx, next) => {
  await auth(ctx, next);
  const body = await JSON.stringify({hello: 'hello'});
  ctx.body = {body};
});

router.get('/something', (ctx) => {
  ctx.body = {
    something: 'something here123',
  };
});

router.get('/', (ctx) => {
  ctx.type = 'html';
  ctx.body = createReadStream(path.join(path.basename('./public'), 'index.html'));
});

module.exports = router;
