const {findPublishedPostById} = require('src/resources/post.resource');

async function getPostById(id) {
  try {
    return findPublishedPostById(id);
  } catch (error) {
    console.error('Error_service getPPostById: ', error);
    throw new Error('Cannot find post');
  }
}

async function getPPostById(id) {
  try {
    const post = await findPublishedPostById(id);
    if (!post) { throw new Error(`No post with id: ${id}`); }
    return post;
  } catch (error) {
    console.error('Error_service getPPostById:', error);
    throw new Error('Cannot find post');
  }
}

module.exports = {
  getPostById,
  getPPostById,
};
