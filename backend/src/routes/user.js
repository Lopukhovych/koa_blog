const userController = require('../controllers/user');

module.exports = (router) => {
    router.get('/user', userController.user_list);
    router.get('/user/:id', userController.user_detail);
    router.post('/user', userController.user_create);
    router.put('/user/:id', userController.user_update);
    router.del('/user/:id', userController.user_delete);
    return router;
};
