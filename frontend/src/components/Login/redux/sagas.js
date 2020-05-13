import {put, call, takeEvery} from 'redux-saga/effects';
import {setStorageItem} from 'src/utils/others';
import {authUserSuccess} from 'src/core/redux/actions';
import {
  loginStart,
  loginSuccess,
  loginFail,
  LOGIN_USER,
  LOGIN_GOOGLE_USER,
} from './actions';
import {login, loginGoogle} from '../api';

function* loginProceed(apiRequest, authData) {
  yield put(loginStart());
  try {
    const {token, ...userData} = yield call(apiRequest, authData);
    if (token) setStorageItem('token', token);
    yield put(authUserSuccess(userData));
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* loginUserSaga(action) {
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  yield loginProceed(login, authData);
}

export function* loginGoogleUserSaga(action) {
  const authData = {
    code: action.code,
    returnSecureToken: true,
  };
  yield loginProceed(loginGoogle, authData);
}

export function* watchLogin() {
  yield takeEvery(LOGIN_USER, loginUserSaga);
  yield takeEvery(LOGIN_GOOGLE_USER, loginGoogleUserSaga);
}
