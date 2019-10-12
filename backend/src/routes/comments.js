const commentController = require('../controllers/comments');

module.exports = (router) => {
    router.get('/comments', commentController.comment_list);
    router.get('/comments/:id', commentController.comment_detail);
    router.post('/comments', commentController.comment_create);
    router.put('/comments/:id', commentController.comment_update);
    router.del('/comments/:id', commentController.comment_delete);
    return router;
};
