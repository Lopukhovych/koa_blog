const commentController = require('../controllers/comments.controller');

module.exports = (router) => {
  router.get('/comments/:id', commentController.commentList);
  router.post('/comments', commentController.commentCreate);
  router.post('/comments_custom', commentController.customCommentCreate);
  router.put('/comments/:id', commentController.commentUpdate);
  router.del('/comments/:id', commentController.commentDelete);
  router.get('/comment/:id', commentController.commentDetail);
  return router;
};
