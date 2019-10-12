const postController = require('../controllers/post');

module.exports = (router) => {
    router.get('/post', postController.post_list);
    router.get('/post/:id', postController.post_detail);
    router.post('/post', postController.post_create);
    router.put('/post/:id', postController.post_update);
    router.del('/post/:id', postController.post_delete);
    return router;
};
