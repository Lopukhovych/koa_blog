import {
  SIGNUP_REQUEST_FAILED, SIGNUP_REQUEST_PENGING, AUTH_SUCCESS,
} from './actions';


const initialState = {
  userData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST_PENGING:
      break;
    case SIGNUP_REQUEST_FAILED:
      return {error: {...action.payload}};
    default:
      break;
  }
  return state;
};

export default reducer;
