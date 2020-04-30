const authController = require('src/controllers/auth');
const socialAuthController = require('src/controllers/serviceAuth');

module.exports = (router) => {
  router.post('/login', authController.login);
  router.post('/initialize', authController.initialize);
  router.post('/restore_password', authController.restorePassword);
  router.post('/signup', authController.signup.bind(authController));
  router.post('/auth/google', socialAuthController.googleLogin);
  return router;
};
