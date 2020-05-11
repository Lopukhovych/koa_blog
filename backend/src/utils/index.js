const models = require('models');
const Sequelize = require('sequelize');
const {userStatus} = require('src/constants');

async function getCommentListToPost(postId) {
  const comments = await models.Comment
    .findAll({
      attributes: [
        'id',
        'comment',
        'createdAt',
      ],
      where: { postId },
      include: {
        model: models.Users,
        attributes: ['id', 'email'],
        required: false,
        as: 'author',
      },
      raw: true,
    });
  return comments;
}

async function getCategoryList() {
  return models.Category
    .findAll({
      attributes: ['id', 'title'],
      raw: true,
    });
}

async function getCategoryById(categoryId) {
  return models.Category.findOne({where: {id: categoryId}, raw: true });
}

async function getActiveUserList() {
  models.Users.findAll({
    attributes: ['id', 'email', 'roleId', 'status', 'userInfo'],
    where: Sequelize.and(
      { status: userStatus.active },
    ),
    raw: true,
  });
}

async function getShortActiveUserInfo() {
  return models.Users.findAll({
    attributes: ['id', 'email', 'userInfo'],
    where: Sequelize.and(
      { status: userStatus.active },
    ),
    raw: true,
  }).map(({id, email, userInfo}) => ({id, email, name: userInfo.name}));
}


module.exports = {
  getCommentListToPost,
  getCategoryList,
  getCategoryById,
  getActiveUserList,
  getShortActiveUserInfo,
};
