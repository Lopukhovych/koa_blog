export const LOAD_CATEGORY = 'LOAD_CATEGORY';
export const LOAD_CATEGORY_PENDING = 'LOAD_CATEGORY_PENDING';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_FAILURE = 'LOAD_CATEGORY_FAILURE';

export const loadCategoryAction = (id) => ({
  type: LOAD_CATEGORY,
  id,
});

export const loadCategoryStart = () => ({
  type: LOAD_CATEGORY_PENDING,
});

export const loadCategorySuccess = (data) => ({
  type: LOAD_CATEGORY_SUCCESS,
  data,
});

export const loadCategoryFailure = (error) => ({
  type: LOAD_CATEGORY_FAILURE,
  error,
});
