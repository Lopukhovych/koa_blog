import {LOGIN_REQUEST_FAILED, LOGIN_REQUEST_PENGING, LOGIN_REQUEST_SUCCESS} from './actions';

const initialState = {
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST_PENGING:
      break;
    case LOGIN_REQUEST_SUCCESS:
      return {...initialState};
    case LOGIN_REQUEST_FAILED:
      return { error: {...action.payload}};
    default:
      break;
  }
  return state;
};

export default reducer;
