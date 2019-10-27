import {put, call, takeEvery} from 'redux-saga/effects';
import {setStorageItem} from 'src/utils/others';
import {authUserSuccess} from 'src/core/redux/actions';
import {
  loginStart, loginSuccess, loginFail, LOGIN_USER,
} from './actions';
import {login} from '../api';

export function* loginUserSaga(action) {
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  yield put(loginStart());
  try {
    const {token, ...userData} = yield call(login, authData);
    if (token) setStorageItem('token', token);
    yield put(authUserSuccess(userData));
    yield put(loginSuccess());
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN_USER, loginUserSaga);
}
