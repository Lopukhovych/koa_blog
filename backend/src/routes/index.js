const Router = require('koa-router');

const comments = require('./comments');
const post = require('./post');
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

module.exports = router;
