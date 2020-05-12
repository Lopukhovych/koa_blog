const {auth, moderatorAuth} = require('src/middleware/auth.middleware');
const {setBadRequest} = require('src/middleware/exception.middleware');
const {
  getPostCommentList,
  getCommentDetails,
  updateComment,
  getCommentById,
  checkCommentModifyPermissions,
  createNewComment,
  deleteComment,
} = require('src/services/comments.service');
const {getUserById, findUserFromJwt} = require('src/services/user.service');
const {getPPostById} = require('src/services/post.service');

async function commentList(ctx) {
  try {
    const {id} = ctx.params;
    await auth(ctx);

    const comments = await getPostCommentList(id);

    ctx.status = 200;
    ctx.body = { comments };
  } catch (error) {
    console.error('Error_controller commentList: ', error);
    await setBadRequest(ctx, error);
  }
}

async function commentDetail(ctx) {
  try {
    const {id} = ctx.params;
    await auth(ctx);

    const commentDetails = await getCommentDetails(id);

    ctx.status = 200;
    ctx.body = {...commentDetails};
  } catch (error) {
    console.error('Error_controller commentDetail: ', error.message);
    await setBadRequest(ctx, error);
  }
}

async function commentCreate(ctx) {
  try {
    const {authorization: token} = ctx.request.header;
    const {postId, comment} = ctx.request.body;
    await auth(ctx);

    const user = await findUserFromJwt(token);
    const post = await getPPostById(postId);

    const newComment = await createNewComment({user, post, comment});

    ctx.status = 201;
    ctx.body = {...newComment};
  } catch (error) {
    console.error('Error_controller commentCreate: ', error.message);
    await setBadRequest(ctx, error);
  }
}

async function customCommentCreate(ctx) {
  try {
    const {userId, postId, comment} = ctx.request.body;
    await moderatorAuth(ctx);

    const user = await getUserById(userId);
    const post = await getPPostById(postId);

    const newComment = await createNewComment({user, post, comment});

    ctx.status = 201;
    ctx.body = {...newComment};
  } catch (error) {
    console.error('Error_controller commentCreate: ', error.message);
    await setBadRequest(ctx, error);
  }
}

async function commentUpdate(ctx) {
  try {
    const {authorization: token} = ctx.request.header;
    const {id} = ctx.params;
    await auth(ctx);

    const {comment: newComment} = ctx.request.body;

    const user = await findUserFromJwt(token);
    const comment = await getCommentById(id);
    await checkCommentModifyPermissions(user, comment);

    const updatedComment = await updateComment(comment, newComment);
    ctx.status = 200;
    ctx.body = {...updatedComment.toJSON()};
  } catch (error) {
    console.error('Error_controller commentUpdate: ', error.message);
    return setBadRequest(ctx, error);
  }
}

async function commentDelete(ctx) {
  try {
    const {id} = ctx.params;
    const {authorization: token} = ctx.request.header;
    await auth(ctx);

    const user = await findUserFromJwt(token);
    const comment = await getCommentById(id);

    await checkCommentModifyPermissions(user, comment);
    await deleteComment(comment);

    ctx.body = {deleted: true};
  } catch (error) {
    console.error('Error_controller commentDelete: ', error.message);
    await setBadRequest(ctx, error);
  }
}

module.exports = {
  commentList,
  commentDetail,
  commentUpdate,
  commentCreate,
  customCommentCreate,
  commentDelete,
};
