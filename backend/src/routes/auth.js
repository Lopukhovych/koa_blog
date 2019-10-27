const authController = require('../controllers/auth');
module.exports = (router) => {
    router.post('/login', authController.login);
    router.post('/initialize', authController.initialize);
    router.post('/restore_password', authController.restorePassword);
    router.post('/signup', authController.signup.bind(authController));
    return router;
};
