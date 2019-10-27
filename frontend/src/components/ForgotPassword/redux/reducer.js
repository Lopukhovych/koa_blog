import {
  RESTORE_PASSWORD_PENGING,
  RESTORE_PASSWORD_FAILED,
} from './actions';

const initialState = {
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_PASSWORD_PENGING:
      break;
    case RESTORE_PASSWORD_FAILED:
      return { error: {...action.payload}};
    default:
      break;
  }
  return state;
};

export default reducer;
