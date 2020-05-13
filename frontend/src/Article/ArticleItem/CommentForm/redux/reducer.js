import {
  SAVE_COMMENT_PENDING,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_FAILURE,
} from './actions';

const initialState = {
  pending: false,
  success: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_COMMENT_PENDING:
      return {
        ...initialState,
        pending: true,
      };
    case SAVE_COMMENT_SUCCESS:
      return {
        ...initialState,
        success: true,
      };
    case SAVE_COMMENT_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};
