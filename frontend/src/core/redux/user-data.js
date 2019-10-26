import {AUTH_SUCCESS, SIGN_OUT_SUCCESS} from './actions';

const initialState = {
  userData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...initialState,
        userData: {...action.payload},
      };
    case SIGN_OUT_SUCCESS:
      return {...initialState};
    default:
      break;
  }
  return state;
};

export default reducer;
