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

async function getUserById(id) {
  try {
    return models.Users.findOne({ where: { id }, raw: true });
  } catch (error) {
    console.error('getUserById error: ', error.message);
    return error;
  }
}

async function getPostById(id) {
  try {
    return models.Post.findOne({ where: { id }, raw: true });
  } catch (error) {
    console.error('GetPostById error: ', error.message);
    return error;
  }
}

async function getUserByEmail(email) {
  try {
    return models.Users.findOne({ where: { email }, raw: true });
  } catch (error) {
    console.error('getUserByEmail error: ', error.message);
    return error;
  }
}

async function getCategoryList() {
  return models.Category
    .findAll({
      attributes: ['id', 'title'],
      raw: true,
    });
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
  getUserById,
  getPostById,
  getUserByEmail,
  getCategoryList,
  getActiveUserList,
  getShortActiveUserInfo,
};
