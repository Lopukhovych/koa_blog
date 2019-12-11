const { articleStatus } = require('src/constants');
const models = require('models');
const Sequelize = require('sequelize');
const {getCommentListToPost, getCategoryList, getShortActiveUserInfo} = require('src/utils');
const {getUserById, setBadRequest} = require('./auth');
const {getCategoryById} = require('./categories');

const {Op} = Sequelize;
function getPostInfo(post, authorList, categoryList) {
  const {
    userId,
    categoryId,
    ...postInfo
  } = post;
  const author = authorList.find((authorItem) => authorItem.id === +userId);
  const category = categoryList.find((categoryItem) => categoryItem.id === +categoryId);
  return {
    ...postInfo,
    author,
    category,
  };
}

async function postList(ctx) {
  const posts = await models.Post
    .findAll({
      where: {
        publishedDate: {
          [Op.not]: null,
        },
        status: articleStatus.published,
      },
      raw: true,
    });
  const categoryList = await getCategoryList();
  const userList = await getShortActiveUserInfo();
  const processedPostList = posts.map((post) => getPostInfo(post, userList, categoryList));
  ctx.body = [...processedPostList];
}

async function postDetail(ctx) {
  try {
    const post = await models.Post.findOne({ where: { id: ctx.params.id }, raw: true });
    const categoryList = await getCategoryList();
    const userList = await getShortActiveUserInfo();
    const commentList = await getCommentListToPost(post.id);
    const precessedPost = getPostInfo(post, userList, categoryList);
    precessedPost.commentList = commentList;
    ctx.body = {...precessedPost};
  } catch (error) {
    console.error('Post details: ', error.message);
  }
}

async function postCreate(ctx) {
  const {
    title, content, userId, imageUrl, categoryId,
  } = ctx.request.body;

  if (!title.trim() || !content || !+userId || !+categoryId) {
    ctx.status = 400;
    ctx.body = {
      error: 'Required params does not exists',
    };
    return;
  }
  try {
    const author = await getUserById(+userId);
    const category = await getCategoryById(+categoryId);
    if (!author || !category) {
      setBadRequest(ctx);
      return;
    }
    const newPost = {
      title: title.trim(),
      content,
      userId,
      imageUrl,
      categoryId,
      status: articleStatus.inReview,
      viewNumber: 0,
    };
    const post = await models.Post.create(newPost);
    if (post) {
      ctx.status = 200;
      delete newPost.categoryId;
      delete newPost.userId;
      newPost.id = post.id;
      newPost.author = {id: author.id, email: author.email, name: author.name};
      newPost.category = {id: category.id, title: category.title};
      newPost.createdAt = post.createdAt;
      newPost.publishedDate = null;
      ctx.body = {...newPost};
    } else {
      setBadRequest(ctx, post);
    }
  } catch (error) {
    console.error(`Create new post error: ${error.message}`);
  }
}

async function postUpdate(ctx) {
  let post = await models.Post.findOne({ where: { id: ctx.params.id } });
  const {
    title, content, imageUrl, categoryId, status, publishedDate,
  } = ctx.request.body;
  const updatedPost = {
    title: title && title.trim(),
    content,
    imageUrl,
    categoryId,
    status,
    publishedDate: publishedDate && new Date(publishedDate),
  };
  post = await post.update(updatedPost);
  ctx.body = { post };
}

async function postDelete(ctx) {
  const post = await models.Post.findOne({ where: { id: ctx.params.id } });
  await post.destroy();
  ctx.body = { deleted: true };
}

module.exports = {
  postList, postDetail, postCreate, postUpdate, postDelete,
};
