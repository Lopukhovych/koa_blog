const {getUserById, findUserFromJwt} = require('src/services/user.service');
const {
  getPostListInfo,
  getPostDetailById,
  validatePostCreateParams,
  createNewPost,
  getPPostById,
  checkPostModifyPermissions,
  updatePost,
  deletePost,
} = require('src/services/post.service');
const {authorAuth, auth} = require('src/middleware/auth.middleware');
const {getCategoryById} = require('src/services/category.service');
const {setBadRequest} = require('src/middleware/exception.middleware');

async function postList(ctx) {
  try {
    const {query} = ctx.request;
    const postListInfo = await getPostListInfo(query);

    ctx.status = 200;
    ctx.body = {...postListInfo};
  } catch (error) {
    console.error('Error_controller postList:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function postDetail(ctx) {
  try {
    const {id} = ctx.params;

    const post = await getPostDetailById(id);

    ctx.status = 200;
    ctx.body = {post};
  } catch (error) {
    console.error('Error_controller postDetail:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function postCreate(ctx) {
  try {
    const {
      title, content, userId, imageUrl, categoryId,
    } = ctx.request.body;

    await authorAuth(ctx);

    await validatePostCreateParams(title, content, userId, categoryId);

    const author = await getUserById(+userId);
    const category = await getCategoryById(+categoryId);

    const post = await createNewPost({
      title,
      content,
      imageUrl,
      author,
      category,
    });

    ctx.status = 201;
    ctx.body = {...post};
  } catch (error) {
    console.error('Error_controller postCreate:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function postUpdate(ctx) {
  try {
    const {id} = ctx.params;
    const {authorization: token} = ctx.request.header;
    const {
      title, content, imageUrl, categoryId, status, publishedDate,
    } = ctx.request.body;
    await auth(ctx);

    const user = await findUserFromJwt(token);
    const post = await getPPostById(id);
    await checkPostModifyPermissions(user, post);

    const updatedPost = await updatePost({
      title, content, imageUrl, categoryId, status, publishedDate,
    }, post);

    ctx.status = 200;
    ctx.body = { post: updatedPost };
  } catch (error) {
    console.error('Error_controller postUpdate:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function postDelete(ctx) {
  try {
    const {id} = ctx.params;
    const {authorization: token} = ctx.request.header;
    await auth(ctx);

    const user = await findUserFromJwt(token);
    const post = await getPPostById(id);
    await checkPostModifyPermissions(user, post);

    await deletePost(post);

    ctx.status = 200;
    ctx.body = {
      deleted: true,
    };
  } catch (error) {
    console.error('Error_controller postDelete:', error.message);
    await setBadRequest(ctx, error);
  }
}

module.exports = {
  postList, postDetail, postCreate, postUpdate, postDelete,
};
