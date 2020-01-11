import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_ABOUT_US,
  loadAboutUsStart,
  loadAboutUsSuccess,
  loadAboutUsFail,
} from './actions';
import { loadAboutUs } from '../api';

export function* loadArticleSaga() {
  yield put(loadAboutUsStart());
  try {
    const articleData = yield call(loadAboutUs);
    yield put(loadAboutUsSuccess(articleData));
  } catch (error) {
    yield put(loadAboutUsFail(error));
  }
}

export function* watchLoadUs() {
  yield takeEvery(LOAD_ABOUT_US, loadArticleSaga);
}
