import {setStorageItem} from 'src/utils/others';
import {AUTH_SUCCESS} from 'src/core/redux/actions';

export const INITIALIZE_USER = 'INITIALIZE_USER';
export const INITIALIZE_REQUEST_PENGING = 'INITIALIZE_REQUEST_PENGING';
export const INITIALIZE_REQUEST_FAILED = 'INITIALIZE_REQUEST_FAILED';


export const initializeUser = () => ({type: INITIALIZE_USER});

export const initializeStart = () => ({
  type: INITIALIZE_REQUEST_PENGING,
});

export const initializeSuccess = (payload) => {
  const {refreshToken, ...userData} = payload;
  if (refreshToken) setStorageItem('token', refreshToken);
  return {
    type: AUTH_SUCCESS,
    payload: userData,
  };
};

export const initializeFail = (error) => ({
  type: INITIALIZE_REQUEST_FAILED,
  payload: error,
});
