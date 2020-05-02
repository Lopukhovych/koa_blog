const models = require('models');
const Sequelize = require('sequelize');
const {articleStatus} = require('src/constants');

async function findPostList(options = {}) {
  return models.Post.findAll(options);
}

async function findCategoryPostListWithUserAndDetails(categoryId = 0) {
  return models.Post.findAll({
    attributes: [
      'id', 'title', 'imageUrl', 'publishedDate', 'userId', 'viewNumber',
    ],
    where: Sequelize.and(
      {categoryId},
      {status: articleStatus.published},
    ),
    include: {
      model: models.Users,
      attributes: ['email', 'userInfo'],
      required: false,
      as: 'author',
    },
    order: [
      ['viewNumber', 'DESC'],
    ],
    limit: 10,
    raw: true,
  });
}

async function getPostById(id) {
  return models.Post.findByPk(id);
}

module.exports = {
  findPostList,
  findCategoryPostListWithUserAndDetails,
  getPostById,
};
