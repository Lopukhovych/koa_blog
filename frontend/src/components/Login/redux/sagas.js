import {put, takeEvery} from 'redux-saga/effects';
import {
  authStart, authSuccess, authFail, LOGIN_USER,
} from './actions';

import {login} from '../api';

export function* authUserSaga(action) {
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  yield put(authStart());
  try {
    const resp = yield login(authData);
    yield put(authSuccess(resp));
  } catch (error) {
    yield put(authFail(error));
  }
}

export function* watchLogin() {
  yield takeEvery(LOGIN_USER, authUserSaga);
}
