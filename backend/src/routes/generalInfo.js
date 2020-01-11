const infoController = require('../controllers/generalInfo');

module.exports = (router) => {
  router.get('/about-us', infoController.aboutUsHandler);
  return router;
};
