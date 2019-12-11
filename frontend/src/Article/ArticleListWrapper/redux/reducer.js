import {
  LOAD_ARTICLE_LIST_PENDING,
  LOAD_ARTICLE_LIST_SUCCESS,
  LOAD_ARTICLE_LIST_ERROR,
} from './actions';

const initialState = {
  pending: false,
  error: null,
  articleList: [],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLE_LIST_PENDING:
      return {
        ...initialState,
        pending: true,
      };
    case LOAD_ARTICLE_LIST_SUCCESS:
      return {
        ...initialState,
        articleList: action.data,
      };
    case LOAD_ARTICLE_LIST_ERROR:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};
