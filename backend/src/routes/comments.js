const commentController = require('../controllers/comments');

module.exports = (router) => {
  router.get('/comments', commentController.commentList);
  router.get('/comments/:id', commentController.commentDetail);
  router.post('/comments', commentController.commentCreate);
  router.put('/comments/:id', commentController.commentUpdate);
  router.del('/comments/:id', commentController.commentDelete);
  return router;
};
