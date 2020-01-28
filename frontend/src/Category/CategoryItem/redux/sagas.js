import {takeEvery, put, call} from 'redux-saga/effects';
import {
  LOAD_CATEGORY,
  loadCategoryStart,
  loadCategorySuccess,
  loadCategoryFailure,
} from './actions';

import {loadCategoryList} from '../api';

function* loadCategory(data) {
  yield put(loadCategoryStart());
  try {
    const categoryInfo = yield call(loadCategoryList, data.id);
    yield put(loadCategorySuccess(categoryInfo));
  } catch (error) {
    yield put(loadCategoryFailure(error));
  }
}

export function* watchCategory() {
  yield takeEvery(LOAD_CATEGORY, loadCategory);
}
