export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const SIGN_OUT_FAILED = 'SIGN_OUT_FAILED';

export const authUserSuccess = (userData) => ({
  type: AUTH_SUCCESS,
  payload: userData,
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOutFail = (error) => ({
  type: SIGN_OUT_FAILED,
  payload: error,
});
