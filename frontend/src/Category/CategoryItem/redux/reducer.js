import {
  LOAD_CATEGORY_PENDING,
  LOAD_CATEGORY_SUCCESS,
  LOAD_CATEGORY_FAILURE,
} from './actions';

const initialState = {
  pending: false,
  error: null,
  categoryInfo: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORY_PENDING:
      return {
        ...initialState,
        pending: true,
      };
    case LOAD_CATEGORY_SUCCESS:
      return {
        ...initialState,
        categoryInfo: action.data,
      };
    case LOAD_CATEGORY_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
}
