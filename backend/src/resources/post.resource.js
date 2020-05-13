const models = require('models');
const Sequelize = require('sequelize');
const {articleStatus} = require('src/constants');

const {Op} = Sequelize;

async function findPostListByCategoryId(categoryId) {
  return models.Post.findAll({
    attributes: ['id', 'title', 'imageUrl'],
    where: Sequelize.and(
      {categoryId},
      {status: articleStatus.published},
    ),
    order: [['viewNumber', 'DESC']],
    limit: 3,
    raw: true,
  });
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

async function findPostById(id) {
  return models.Post.findByPk(id);
}

async function findPublishedPostById(id) {
  return models.Post.findOne({
    where: {
      id: +id,
      status: articleStatus.published,
    },
  });
}

async function findPostListWithOptions(options) {
  return models.Post
    .findAndCountAll({
      where: {
        publishedDate: {
          [Op.not]: null,
        },
        status: articleStatus.published,
      },
      include: [
        {
          as: 'author',
          model: models.Users,
          attributes: ['id', 'email', 'userInfo'],
          required: false,
        }, {
          model: models.Category,
          attributes: ['id', 'title'],
          required: false,
          as: 'category',
        },
      ],
      ...options,
    });
}

async function findPostDetailsById(id) {
  return models.Post
    .findOne({
      where: {
        id,
        publishedDate: {
          [Op.not]: null,
        },
        status: articleStatus.published,
      },
      include: [
        {
          as: 'author',
          model: models.Users,
          attributes: ['id', 'email', 'userInfo'],
          required: false,
        }, {
          model: models.Category,
          attributes: ['id', 'title'],
          required: false,
          as: 'category',
        },
      ],
    });
}

async function createPost(post) {
  return models.Post.create(post);
}

module.exports = {
  findPostListByCategoryId,
  findCategoryPostListWithUserAndDetails,
  findPostById,
  findPublishedPostById,
  findPostListWithOptions,
  findPostDetailsById,
  createPost,
};
