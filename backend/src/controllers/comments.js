const models = require('models');
const { auth, badRequest } = require('src/controllers/auth');
const {getUserById} = require('./auth');
const {getPostById} = require('./post');

async function commentList(ctx, next) {
  try {
    await auth(ctx, next);
    const comments = await models.Comment.findAll();
    ctx.status = 200;
    ctx.body = { comments };
  } catch (error) {
    badRequest(ctx, error);
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
  let comment = await models.Comment.findOne({ where: { id: ctx.params.id } });
  comment = await comment.update(ctx.request.body.comment);
  ctx.body = { comment };
}

async function commentCreate(ctx) {
  const requestBody = ctx.request.body;
  try {
    ctx.status = 200;
    const user = getUserById(+requestBody.userId);
    const post = getPostById(+requestBody.postId);
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
    ctx.body = await models.Comment.create(newComment);
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
  commentList, commentDetail, commentUpdate, commentCreate, commentDelete,
};
