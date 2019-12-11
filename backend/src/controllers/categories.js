const models = require('models');

async function getCategoryById(categoryId) {
  return models.Category.findOne({where: {id: categoryId}, raw: true });
}

module.exports = {
  getCategoryById,
};
