import {
  LOAD_ARTICLE_LIST_PENDING,
  LOAD_ARTICLE_LIST_SUCCESS,
  LOAD_ARTICLE_LIST_ERROR,
} from './actions';

const initialState = {
  pending: false,
  error: null,
  articleList: [],
  articleListDetails: {
    current: 1,
    pages: 1,
  },
};


export default (state = initialState, action = {data: {}}) => {
  switch (action.type) {
    case LOAD_ARTICLE_LIST_PENDING:
      return {
        ...initialState,
        pending: true,
      };
    case LOAD_ARTICLE_LIST_SUCCESS:
      console.log('action.data: ', action.data);
      return {
        ...initialState,
        articleList: action.data && action.data.posts,
        articleListDetails: action.data && action.data.details,
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
