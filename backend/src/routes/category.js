const categoryController = require('../controllers/category');

module.exports = (router) => {
  router.get('/category', categoryController.categoryList);
  router.get('/category/:id', categoryController.categoryDetail);
  router.post('/category', categoryController.categoryCreate);
  router.put('/category/:id', categoryController.categoryUpdate);
  router.del('/category/:id', categoryController.categoryDelete);
  return router;
};
