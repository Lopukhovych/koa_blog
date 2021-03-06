export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_REQUEST_PENGING = 'SIGNUP_REQUEST_PENGING';
export const SIGNUP_REQUEST_SUCCESS = 'SIGNUP_REQUEST_SUCCESS';
export const SIGNUP_REQUEST_FAILED = 'SIGNUP_REQUEST_FAILED';

export const signUpUser = (userData) => ({
  type: SIGNUP_USER,
  ...userData,
});

export const signUpStart = () => ({
  type: SIGNUP_REQUEST_PENGING,
});

export const signUpSuccess = () => ({
  type: SIGNUP_REQUEST_SUCCESS,
});

export const signUpFail = (error) => ({
  type: SIGNUP_REQUEST_FAILED,
  payload: error,
});
