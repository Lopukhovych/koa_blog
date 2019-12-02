import {
  LOAD_ARTICLE_PENDING,
  LOAD_ARTICLE_SUCCESS,
  LOAD_ARTICLE_FAILURE,
} from 'src/Article/ArticleItem/redux/actions';

const initialState = {
  pending: false,
  error: null,
  article: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLE_PENDING:
      return {
        ...initialState,
        pending: true,
      };
    case LOAD_ARTICLE_SUCCESS:
      console.log('LOAD_ARTICLE_SUCCESS action: ', action);
      return {
        ...initialState,
        article: action.data,
      };
    case LOAD_ARTICLE_FAILURE:
      console.log('LOAD_ARTICLE_FAILURE action: ', action);
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};
