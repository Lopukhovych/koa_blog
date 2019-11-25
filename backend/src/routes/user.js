const userController = require('../controllers/user');

module.exports = (router) => {
  router.get('/user', userController.getUserList);
  router.get('/user/:id', userController.getUserDetails);
  router.post('/user', userController.userCreate);
  router.put('/user/:id', userController.userUpdate);
  router.del('/user/:id', userController.userDelete);
  return router;
};
