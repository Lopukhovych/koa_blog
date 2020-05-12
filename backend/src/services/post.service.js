const {
  findPublishedPostById,
  findPostListWithOptions,
  findPostDetailsById,
  createPost,
} = require('src/resources/post.resource');
const { articleStatus } = require('src/constants');
const {findModeratorPermissionIds} = require('src/resources/roles');

const DefaultLoadLimit = 5;

async function getPostById(id) {
  try {
    return findPublishedPostById(id);
  } catch (error) {
    console.error('Error_service getPPostById: ', error);
    throw new Error('Cannot find article');
  }
}

async function getPPostById(id) {
  try {
    const post = await findPublishedPostById(id);
    if (!post) { throw new Error(`No post with id: ${id}`); }
    return post;
  } catch (error) {
    console.error('Error_service getPPostById:', error);
    throw new Error('Cannot find article');
  }
}

async function getPostListInfo(params) {
  try {
    const {popular, limit = DefaultLoadLimit, page = 1} = await params;
    const loadPage = page > 0 ? page : 1;
    const offset = (page - 1) * limit;
    const order = [];

    if (popular) {
      order.push(['viewNumber', 'DESC']);
    }

    const {rows: posts, count} = await findPostListWithOptions({order, offset, limit});

    return {
      posts,
      details: {
        pages: Math.ceil(count / limit),
        current: +loadPage,
      },
    };
  } catch (error) {
    console.error('Error_service getPostList:', error);
    throw new Error('Cannot find article list');
  }
}

async function getPostDetailById(id) {
  try {
    const post = await findPostDetailsById(id);
    if (!post) {
      throw new Error();
    }
    return post;
  } catch (error) {
    console.error('Error_service getPostDetailById:', error);
    throw new Error('Cannot find article details');
  }
}

async function validatePostCreateParams(title, content, userId, categoryId) {
  if (!title.trim() || !content || !+userId || !+categoryId) {
    throw new Error('Required params does not exists');
  }
}

async function createNewPost({
  title,
  content,
  imageUrl,
  author,
  category,
}) {
  try {
    const {id: categoryId, title: categoryTitle} = category;
    const {id: authorId, email, userInfo} = author;
    const newPost = {
      title: title.trim(),
      content,
      userId: authorId,
      imageUrl,
      categoryId,
      status: articleStatus.inReview,
      viewNumber: 0,
    };
    const post = await createPost(newPost);
    if (!post) {
      throw new Error();
    }
    const {userId, categoryId: cId, ...postInfo} = post.toJSON();
    return {
      ...postInfo,
      author: {
        id: authorId,
        email,
        userInfo,
      },
      category: {
        id: categoryId,
        title: categoryTitle,
      },
    };
  } catch (error) {
    console.error('Error_service createNewPost:', error);
    throw new Error('Cannot create new article');
  }
}

async function checkPostModifyPermissions(user, post) {
  try {
    const {id, roleId} = user;
    const {userId: authorId} = post;
    const moderatorIds = await findModeratorPermissionIds();
    if (moderatorIds.includes(roleId) || id === authorId) {
      return;
    }
    throw new Error(`User with id ${id} cannot not change this post`);
  } catch (error) {
    console.error('Error_service checkPostModifyPermissions:', error.message);
    throw new Error('Invalid permissions');
  }
}

async function updatePost({
  title, content, imageUrl, categoryId, status, publishedDate,
}, post) {
  try {
    const updatedPost = {
      title: title && title.trim(),
      content,
      imageUrl,
      categoryId,
      status,
      publishedDate: publishedDate && new Date(publishedDate),
    };
    return post.update(updatedPost);
  } catch (error) {
    console.error('Error_service checkPostModifyPermissions:', error.message);
    throw new Error('Invalid permissions');
  }
}

async function deletePost(post) {
  try {
    await post.destroy();
  } catch (error) {
    console.error('Error_service checkPostModifyPermissions:', error.message);
    throw new Error('Invalid permissions');
  }
}

module.exports = {
  getPostById,
  getPPostById,
  getPostListInfo,
  getPostDetailById,
  validatePostCreateParams,
  createNewPost,
  checkPostModifyPermissions,
  updatePost,
  deletePost,
};
