import {AUTH_SUCCESS} from './actions';

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
    default:
      break;
  }
  return state;
};

export default reducer;
