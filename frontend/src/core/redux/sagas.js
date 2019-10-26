import {put, takeEvery} from 'redux-saga/effects';

import {removeStorageItem} from 'src/utils/others';

import {
  signOutSuccess, signOutFail, SIGN_OUT_USER,
} from './actions';


export function* signOutUserSaga() {
  try {
    removeStorageItem('token');
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFail(error));
  }
}

export function* watchSignOut() {
  yield takeEvery(SIGN_OUT_USER, signOutUserSaga);
}
