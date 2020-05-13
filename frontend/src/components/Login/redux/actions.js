export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_GOOGLE_USER = 'LOGIN_GOOGLE_USER';
export const LOGIN_REQUEST_PENDING = 'LOGIN_REQUEST_PENDING';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';


export const loginUser = (userData) => ({
  type: LOGIN_USER,
  ...userData,
});

export const loginGoogleUser = (userData) => ({
  type: LOGIN_GOOGLE_USER,
  ...userData,
});

export const loginStart = () => ({
  type: LOGIN_REQUEST_PENDING,
});

export const loginSuccess = () => ({
  type: LOGIN_REQUEST_SUCCESS,
});

export const loginFail = (error) => ({
  type: LOGIN_REQUEST_FAILED,
  payload: error,
});
