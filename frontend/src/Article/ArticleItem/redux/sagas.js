import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_ARTICLE,
  loadArticleStart,
  loadArticleSuccess,
  loadArticleFailure,
} from './actions';
import { loadArticle } from '../apiService';

export function* loadArticleSaga(action) {
  yield put(loadArticleStart());
  try {
    const articleData = yield call(loadArticle, action && action.id);
    yield put(loadArticleSuccess(articleData));
  } catch (error) {
    yield put(loadArticleFailure(error));
  }
}

export function* watchArticle() {
  yield takeEvery(LOAD_ARTICLE, loadArticleSaga);
}
