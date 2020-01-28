import {put, call, takeEvery} from 'redux-saga/effects';
import {
  LOAD_CATEGORY_LIST,
  loadCategoryListStart,
  loadCategoryListSuccess,
  loadCategoryListFailure,
} from './actions';
import {loadCategoryList} from '../api';

function* loadCategoryListSaga() {
  yield put(loadCategoryListStart());
  try {
    const categoryList = yield call(loadCategoryList);
    yield put(loadCategoryListSuccess(categoryList));
  } catch (error) {
    yield put(loadCategoryListFailure(error));
  }
}

export function* watchCategoryList() {
  yield takeEvery(LOAD_CATEGORY_LIST, loadCategoryListSaga);
}
