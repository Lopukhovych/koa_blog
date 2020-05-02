const models = require('models');


async function findAllCategories() {
  return models.Category.findAll({
    attributes: ['id', 'title'],
    raw: true,
  });
}

async function findCategoryByPk(id) {
  return models.Category.findByPk(id);
}

async function createCategory(title) {
  return models.Category.findOrCreate({
    where: {title},
  });
}

module.exports = {
  findAllCategories,
  createCategory,
  findCategoryByPk,
};
