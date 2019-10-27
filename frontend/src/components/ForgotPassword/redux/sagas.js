import {put, call, takeEvery} from 'redux-saga/effects';
import {setStorageItem} from 'src/utils/others';
import {authUserSuccess} from 'src/core/redux/actions';
import {
  restorePasswordStart, restorePasswordSuccess, restorePasswordFail, RESTORE_PASSWORD,
} from './actions';

import {restorePasswordRequest} from '../api';

export function* restorePasswordSaga(action) {
  const authData = {
    email: action.email,
    password: action.password,
    secretWord: action.secretWord,
  };
  yield put(restorePasswordStart());
  try {
    const {token, ...userData} = yield call(restorePasswordRequest, authData);
    if (token) setStorageItem('token', token);
    yield put(authUserSuccess(userData));
    yield put(restorePasswordSuccess());
  } catch (error) {
    yield put(restorePasswordFail(error));
  }
}

export function* restorePassword() {
  yield takeEvery(RESTORE_PASSWORD, restorePasswordSaga);
}
