const models = require('models');

async function getCategoryById(categoryId) {
  return models.Category.findOne({where: {id: categoryId}, raw: true });
}

async function getCategoryList() {
  return models.Category
    .findAll({
      attributes: ['id', 'title'],
      raw: true,
    });
}

module.exports = {
  getCategoryById, getCategoryList,
};
