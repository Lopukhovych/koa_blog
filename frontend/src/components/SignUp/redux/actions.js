import {setStorageItem} from 'src/utils/others';
import {AUTH_SUCCESS} from 'src/core/redux/actions';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_REQUEST_PENGING = 'SIGNUP_REQUEST_PENGING';
export const SIGNUP_REQUEST_FAILED = 'SIGNUP_REQUEST_FAILED';

export const signUpUser = (userData) => ({
  type: SIGNUP_USER,
  ...userData,
});

export const signUpStart = () => ({
  type: SIGNUP_REQUEST_PENGING,
});

export const signUpSuccess = (payload) => {
  const {token, ...userData} = payload;
  if (payload.token) setStorageItem('token', token);
  return {
    type: AUTH_SUCCESS,
    payload: userData,
  };
};

export const signUpFail = (error) => ({
  type: SIGNUP_REQUEST_FAILED,
  payload: error,
});
