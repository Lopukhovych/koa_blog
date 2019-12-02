const postController = require('../controllers/post');

module.exports = (router) => {
  router.get('/post', postController.postList);
  router.get('/post/:id', postController.postDetail);
  router.post('/post', postController.postCreate);
  router.put('/post/:id', postController.postUpdate);
  router.del('/post/:id', postController.postDelete);
  return router;
};
