import {
  LOAD_ARTICLE_PENDING,
  LOAD_ARTICLE_SUCCESS,
  LOAD_ARTICLE_FAILURE, RESET_ARTICLE,
} from 'src/Article/ArticleItem/redux/actions';
import {SAVE_COMMENT_SUCCESS} from 'src/Article/ArticleItem/CommentForm/redux/actions';

const initialState = {
  pending: false,
  error: null,
  article: {},
  commentList: [],
};

export default (state = initialState, action) => {
  const {commentList, ...articleInfo} = action && action.data ? action.data : {};
  switch (action.type) {
    case LOAD_ARTICLE_PENDING:
      return {
        ...initialState,
        pending: true,
      };
    case LOAD_ARTICLE_SUCCESS:
      return {
        ...initialState,
        commentList: commentList || [],
        article: articleInfo,
      };
    case LOAD_ARTICLE_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    case RESET_ARTICLE:
      return {
        ...initialState,
      };
    case SAVE_COMMENT_SUCCESS:
      if (state.article) {
        return {
          ...state,
          commentList: [
            ...state.commentList,
            action.data,
          ],
        };
      }
      return state;
    default:
      return state;
  }
};
