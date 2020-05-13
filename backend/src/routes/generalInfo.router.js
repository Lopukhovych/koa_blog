const infoController = require('../controllers/generalInfo.controller');

module.exports = (router) => {
  router.get('/about-us', infoController.aboutUsHandler);
  router.get('/contact-us', infoController.contactUsGetHandler);
  router.post('/contact-us', infoController.contactUsSendMessageHandler);
  return router;
};
