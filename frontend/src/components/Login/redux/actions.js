import {setStorageItem} from 'src/core/utils';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_REQUEST_PENGING = 'LOGIN_REQUEST_PENGING';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';

export const loginUser = (userData) => {
  return {
    type: LOGIN_USER,
    ...userData,
  };
};

export const authStart = () => ({
  type: LOGIN_REQUEST_PENGING,
});

export const authSuccess = (payload) => {
  const {token, ...userData} = payload;
  if (payload.token) setStorageItem('token', token);
  return {
    type: LOGIN_REQUEST_SUCCESS,
    payload: userData,
  };
};

export const authFail = (error) => ({
  type: LOGIN_REQUEST_FAILED,
  payload: error,
});
