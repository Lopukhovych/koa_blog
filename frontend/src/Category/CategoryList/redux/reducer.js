import {
  LOAD_CATEGORY_LIST_PENDING,
  LOAD_CATEGORY_LIST_SUCCESS,
  LOAD_CATEGORY_LIST_FAILURE,
} from './actions';

const initialState = {
  pending: false,
  error: null,
  categoryList: null,
};


export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORY_LIST_PENDING:
      return {
        ...initialState,
        pending: true,
      };
    case LOAD_CATEGORY_LIST_SUCCESS:
      return {
        ...initialState,
        categoryList: action.data,
      };
    case LOAD_CATEGORY_LIST_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
}
