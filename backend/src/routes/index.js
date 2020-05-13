const Router = require('koa-router');

const info = require('./generalInfo.router');
const post = require('./post.router');
const comments = require('./comments.router');
const auth = require('./auth.router');
const user = require('./user.router');
const category = require('./category.router');

let router = new Router();

router = comments(router);
router = post(router);
router = auth(router);
router = user(router);
router = info(router);
router = category(router);

module.exports = router;
