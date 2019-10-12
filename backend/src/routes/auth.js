const authController = require('../controllers/auth');
module.exports = (router) => {
    router.post('/login', authController.login);
    router.post('/signup', authController.signup.bind(authController));
    return router;
};
