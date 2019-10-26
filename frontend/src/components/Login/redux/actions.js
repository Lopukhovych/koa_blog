import {AUTH_SUCCESS} from 'src/core/redux/actions';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_REQUEST_PENGING = 'LOGIN_REQUEST_PENGING';
export const LOGIN_REQUEST_FAILED = 'LOGIN_REQUEST_FAILED';


export const loginUser = (userData) => ({
  type: LOGIN_USER,
  ...userData,
});

export const loginStart = () => ({
  type: LOGIN_REQUEST_PENGING,
});

export const loginSuccess = (userData) => {
  return {
    type: AUTH_SUCCESS,
    payload: userData,
  };
};

export const loginFail = (error) => ({
  type: LOGIN_REQUEST_FAILED,
  payload: error,
});
