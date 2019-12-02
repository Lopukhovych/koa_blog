import {put, call, takeEvery} from 'redux-saga/effects';
import {
  LOAD_ARTICLE_LIST,
  loadArticleListStart,
  loadArticleListSuccess,
  loadArticleListFailure,
} from './actions';

import {loadArticleList} from '../apiService';
// import { loadArticle } from "src/Article/ArticleItem/apiService";
// import { loadArticleSuccess } from "src/Article/ArticleItem/redux/actions";

export function* loadArticleListSaga(action) {
  console.log('loadArticleListSaga: ');
  yield call(loadArticleListStart);
  try {
    const queryParams = action.params;
    console.log('queryParams: ', queryParams);
    const articleList = yield call(loadArticleList, queryParams);
    console.log('articleList: ', articleList);
    yield put(loadArticleListSuccess(articleList));
  //  const articleData = yield call(loadArticle, action && action.id);
    //     console.log('articleData: ', articleData);
    //     yield put(loadArticleSuccess(articleData));
  } catch (error) {
    yield put(loadArticleListFailure(error));
  }
}

export function* watchArticleList() {
  console.log('qwerty: ');
  yield takeEvery(LOAD_ARTICLE_LIST, loadArticleListSaga);
}
// export function* loadArticleSaga(action) {
//   yield call(loadArticleStart);
//   try {
//     const articleData = yield call(loadArticle, action && action.id);
//     console.log('articleData: ', articleData);
//     yield put(loadArticleSuccess(articleData));
//   } catch (error) {
//     yield put(loadArticleFailure(error));
//   }
// }
//
// export function* watchArticle() {
//   yield takeEvery(LOAD_ARTICLE, loadArticleSaga);
// }
