export const LOAD_ARTICLE_LIST = 'LOAD_ARTICLE_LIST';
export const LOAD_ARTICLE_LIST_PENDING = 'LOAD_ARTICLE_LIST_PENDING';
export const LOAD_ARTICLE_LIST_SUCCESS = 'LOAD_ARTICLE_LIST_SUCCESS';
export const LOAD_ARTICLE_LIST_ERROR = 'LOAD_ARTICLE_LIST_ERROR';

export const loadArticleList = (params) => ({
  type: LOAD_ARTICLE_LIST,
  params,
});

export const loadArticleListStart = () => ({
  type: LOAD_ARTICLE_LIST_PENDING,
});

export const loadArticleListSuccess = (data) => ({
  type: LOAD_ARTICLE_LIST_SUCCESS,
  data,
});

export const loadArticleListFailure = (error) => ({
  type: LOAD_ARTICLE_LIST_ERROR,
  error,
});
