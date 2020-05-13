const authController = require('src/controllers/auth.controller');
const socialAuthController = require('src/controllers/serviceAuth.controller');

module.exports = (router) => {
  router.post('/login', authController.login);
  router.post('/initialize', authController.initialize);
  router.post('/restore_password', authController.restorePassword);
  router.post('/signup', authController.signup);
  router.post('/auth/google', socialAuthController.googleLogin);
  return router;
};
