import {put, call, takeEvery} from 'redux-saga/effects';
import {
  LOAD_ARTICLE_LIST,
  loadArticleListStart,
  loadArticleListSuccess,
  loadArticleListFailure,
} from './actions';

import {loadArticleList} from '../apiService';

export function* loadArticleListSaga(action) {
  yield call(loadArticleListStart);
  try {
    const params = {queryParams: action.params};
    const articleData = yield call(loadArticleList, params);
    yield put(loadArticleListSuccess(articleData));
  } catch (error) {
    yield put(loadArticleListFailure(error));
  }
}

export function* watchArticleList() {
  yield takeEvery(LOAD_ARTICLE_LIST, loadArticleListSaga);
}
