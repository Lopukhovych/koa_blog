export const LOAD_CATEGORY_LIST = 'LOAD_CATEGORY_LIST';
export const LOAD_CATEGORY_LIST_PENDING = 'LOAD_CATEGORY_LIST_PENDING';
export const LOAD_CATEGORY_LIST_SUCCESS = 'LOAD_CATEGORY_LIST_SUCCESS';
export const LOAD_CATEGORY_LIST_FAILURE = 'LOAD_CATEGORY_LIST_FAILURE';

export const loadCategoryListAction = () => ({
  type: LOAD_CATEGORY_LIST,
});

export const loadCategoryListStart = () => ({
  type: LOAD_CATEGORY_LIST_PENDING,
});

export const loadCategoryListSuccess = (data) => ({
  type: LOAD_CATEGORY_LIST_SUCCESS,
  data,
});

export const loadCategoryListFailure = (error) => ({
  type: LOAD_CATEGORY_LIST_FAILURE,
  error,
});
