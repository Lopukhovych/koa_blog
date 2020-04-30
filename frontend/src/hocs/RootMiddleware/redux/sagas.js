import {put, call, takeEvery} from 'redux-saga/effects';
import {getStorageItem, setStorageItem, removeStorageItem} from 'src/utils/others';

import {
  initializeStart, initializeSuccess, initializeFail, INITIALIZE_USER,
} from './actions';

import {initialize} from '../api';

export function* initializeUserSaga() {
  const token = getStorageItem('token');
  const initialData = {
    token,
  };
  yield put(initializeStart());
  try {
    const {refreshToken, ...userData} = yield call(initialize, initialData);
    if (refreshToken) setStorageItem('token', refreshToken);
    yield put(initializeSuccess(userData));
  } catch (error) {
    removeStorageItem('token');
    yield put(initializeFail(error));
  }
}

export function* watchInitialize() {
  yield takeEvery(INITIALIZE_USER, initializeUserSaga);
}
