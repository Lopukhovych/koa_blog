import {
  LOAD_ABOUT_US_PENDING,
  LOAD_ABOUT_US_SUCCESS,
  LOAD_ABOUT_US_FAILED,
} from './actions';

const initialState = {
  pending: false,
  error: null,
  aboutUs: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ABOUT_US_PENDING:
      return {
        ...initialState,
        pending: true,
      };
    case LOAD_ABOUT_US_SUCCESS:
      return {
        ...initialState,
        aboutUs: action.data,
      };
    case LOAD_ABOUT_US_FAILED:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
};
