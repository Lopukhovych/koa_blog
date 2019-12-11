export const LOAD_ARTICLE = 'LOAD_ARTICLE';
export const RESET_ARTICLE = 'RESET_ARTICLE';
export const LOAD_ARTICLE_PENDING = 'LOAD_ARTICLE_PENDING';
export const LOAD_ARTICLE_SUCCESS = 'LOAD_ARTICLE_SUCCESS';
export const LOAD_ARTICLE_FAILURE = 'LOAD_ARTICLE_FAILURE';

export const loadArticle = (id) => ({
  type: LOAD_ARTICLE,
  id,
});

export const resetArticle = () => ({
  type: RESET_ARTICLE,
});

export const loadArticleStart = () => ({
  type: LOAD_ARTICLE_PENDING,
});

export const loadArticleSuccess = (data) => ({
  type: LOAD_ARTICLE_SUCCESS,
  data,
});

export const loadArticleFailure = (error) => ({
  type: LOAD_ARTICLE_FAILURE,
  error,
});
