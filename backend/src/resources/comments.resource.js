const models = require('models');

async function findCommentsListByPostId(id) {
  return models.Comment.findAll({
    where: {
      postId: +id,
    },
    include: {
      model: models.Users,
      attributes: ['email', 'userInfo'],
      required: false,
      as: 'author',
    },
    attributes: ['id', 'comment', 'userId'],
    raw: true,
  });
}

async function findCommentDetails(id) {
  return models.Comment.findOne({
    where: {
      id: +id,
    },
    include: {
      model: models.Users,
      attributes: ['email', 'userInfo'],
      required: false,
      as: 'author',
    },
    attributes: ['id', 'comment', 'userId'],
    raw: true,
  });
}

async function findCommentByPk(id) {
  return models.Comment.findByPk(id);
}

async function createComment(comment) {
  return models.Comment.create(comment);
}

module.exports = {
  findCommentsListByPostId,
  findCommentDetails,
  findCommentByPk,
  createComment,
};
