import {put, call, takeEvery} from 'redux-saga/effects';
import {getStorageItem} from 'src/utils/others';

//
// const token = getStorageItem('token');
// // TODO check token validity
// if (token) {

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
    const resp = yield call(initialize, initialData);
    yield put(initializeSuccess(resp));
  } catch (error) {
    yield put(initializeFail(error));
  }
}

export function* watchInitialize() {
  yield takeEvery(INITIALIZE_USER, initializeUserSaga);
}
