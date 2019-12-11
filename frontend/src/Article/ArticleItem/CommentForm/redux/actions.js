export const SAVE_COMMENT = 'SAVE_COMMENT';

export const SAVE_COMMENT_PENDING = 'SAVE_COMMENT_PENDING';
export const SAVE_COMMENT_SUCCESS = 'SAVE_COMMENT_SUCCESS';
export const SAVE_COMMENT_FAILURE = 'SAVE_COMMENT_FAILURE';


export const saveComment = (params) => ({
  type: SAVE_COMMENT,
  params,
});

export const saveCommentStart = () => ({
  type: SAVE_COMMENT_PENDING,
});

export const saveCommentSuccess = (data) => ({
  type: SAVE_COMMENT_SUCCESS,
  data,
});
export const saveCommentFailure = (error) => ({
  type: SAVE_COMMENT_FAILURE,
  error,
});
