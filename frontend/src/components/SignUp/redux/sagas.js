import {put, call, takeEvery} from 'redux-saga/effects';
import {
  signUpStart, signUpSuccess, signUpFail, SIGNUP_USER,
} from './actions';

import {signup} from '../api';

export function* signupUserSaga(action) {
  const authData = {
    name: action.name,
    email: action.email,
    password: action.password,
    secretWord: action.secretWord,
    returnSecureToken: true,
  };
  yield put(signUpStart());
  try {
    const resp = yield call(signup, authData);
    yield put(signUpSuccess(resp));
  } catch (error) {
    yield put(signUpFail(error));
  }
}

export function* watchSignUp() {
  yield takeEvery(SIGNUP_USER, signupUserSaga);
}
