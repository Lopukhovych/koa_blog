import {put, call, takeEvery} from 'redux-saga/effects';
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
    const resp = yield call(login, authData);
    yield put(loginSuccess(resp));
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN_USER, loginUserSaga);
}
