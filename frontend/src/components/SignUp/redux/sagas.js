import {put, call, takeEvery} from 'redux-saga/effects';
import {setStorageItem} from 'src/utils/others';
import {authUserSuccess} from 'src/core/redux/actions';
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
    const {token, ...userData} = yield call(signup, authData);
    if (token) setStorageItem('token', token);
    yield put(authUserSuccess(userData));
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFail(error));
  }
}

export function* watchSignUp() {
  yield takeEvery(SIGNUP_USER, signupUserSaga);
}
