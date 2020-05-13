const {
  findCommentsListByPostId,
  findCommentDetails,
  findCommentByPk,
  createComment,
} = require('src/resources/comments.resource');
const {proceedAuthorInfo} = require('src/utils/author.util');
const {findModeratorPermissionIds} = require('src/resources/roles.resource');


async function getPostCommentList(id) {
  try {
    const commentList = await findCommentsListByPostId(id);
    if (!commentList || !commentList.length) {
      throw new Error();
    }
    commentList.forEach(proceedAuthorInfo);
    return commentList;
  } catch (error) {
    console.error('Error_service getPostCommentList:', error);
    throw new Error('Cannot get comments list');
  }
}

async function getCommentDetails(id) {
  try {
    const comment = await findCommentDetails(id);
    if (!comment) {
      throw new Error();
    }
    await proceedAuthorInfo(comment);

    return comment;
  } catch (error) {
    console.error('Error_service getCommentDetails:', error);
    throw new Error('Cannot get a comment details');
  }
}

async function getCommentById(id) {
  try {
    const comment = await findCommentByPk(id);
    if (!comment) {
      throw new Error();
    }
    return comment;
  } catch (error) {
    console.error('Error_service getCommentById:', error);
    throw new Error('Cannot find comment');
  }
}

async function createNewComment({user: {id: userId, email: userEmail}, post: {id: postId}, comment = ''}) {
  try {
    const newComment = {
      userId: +userId,
      comment: comment.toString(),
      postId: +postId,
    };
    const createdComment = await createComment(newComment);
    return {
      ...await createdComment.getOptions(['id', 'comment', 'createdAt']),
      'author.id': userId,
      'author.email': userEmail,
      postId,
    };
  } catch (error) {
    console.error('Error_service createNewComment:', error.message);
    throw new Error('Cannot create new comment, try later or login');
  }
}

async function checkCommentModifyPermissions(user, comment) {
  try {
    const {id, roleId} = user;
    const {userId: authorId} = comment;
    const moderatorIds = await findModeratorPermissionIds();
    if (moderatorIds.includes(roleId) || id === authorId) {
      return;
    }
    throw new Error(`User with id ${id} cannot not change this comment`);
  } catch (error) {
    console.error('Error_service checkCommentModifyPermissions:', error.message);
    throw new Error('Invalid permissions');
  }
}

async function updateComment(comment, newComment) {
  try {
    return comment.update({
      comment: newComment,
    });
  } catch (error) {
    console.error('Error_service updateComment:', error.message);
    throw new Error('Comment cannot be updated');
  }
}

async function deleteComment(comment) {
  try {
    await comment.destroy();
  } catch (error) {
    console.error('Error_service deleteComment: ', error.message);
    throw new Error('Cannot delete a comment');
  }
}

module.exports = {
  getPostCommentList,
  getCommentDetails,
  updateComment,
  getCommentById,
  createNewComment,
  checkCommentModifyPermissions,
  deleteComment,
};
