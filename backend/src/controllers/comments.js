const models = require('models');
const {getUserById} = require('src/services/user');
const {auth} = require('src/middleware/auth');
const {setBadRequest} = require('src/middleware/exception');
const {getPostById} = require('../utils');

async function commentList(ctx, next) {
  try {
    await auth(ctx, next);
    const comments = await models.Comment.findAll();
    ctx.status = 200;
    ctx.body = { comments };
  } catch (error) {
    setBadRequest(ctx, error);
  }
}

async function commentDetail(ctx) {
  try {
    ctx.body = await models.Comment.findOne({ where: { id: ctx.params.id } });
  } catch (error) {
    console.error(error.message);
  }
}

async function commentUpdate(ctx) {
  const comment = await models.Comment.findOne({ where: { id: ctx.params.id } });
  ctx.body = await comment.update(ctx.request.body.comment);
}

async function commentCreate(ctx) {
  const requestBody = ctx.request.body;
  try {
    const user = await getUserById(+requestBody.userId);
    const post = await getPostById(+requestBody.postId);
    if (!user || !post) {
      ctx.status = 400;
      ctx.body = {
        error: 'User or post does not exist!',
      };
      return;
    }
    const newComment = {
      userId: +requestBody.userId,
      comment: requestBody.comment.toString(),
      postId: +requestBody.postId,
    };
    ctx.status = 200;
    const {
      id, postId, createdAt, comment,
    } = await models.Comment.create(newComment);
    ctx.body = {
      id,
      comment,
      createdAt,
      'author.id': user.id,
      'author.email': user.email,
      postId,
    };
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      ctx.throw(400, 'Foreign key does not exist');
    }
    ctx.throw(400, 'Comment create error');
  }
}

async function commentDelete(ctx) {
  const comment = await models.Comment.findOne({ where: { id: ctx.params.id } });
  await comment.destroy();
  ctx.body = { deleted: true };
}

module.exports = {
  commentList,
  commentDetail,
  commentUpdate,
  commentCreate,
  commentDelete,
};
