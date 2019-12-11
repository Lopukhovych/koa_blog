import { put, takeEvery, select } from 'redux-saga/effects';
import {
  SAVE_COMMENT,
  saveCommentStart,
  saveCommentSuccess,
  saveCommentFailure,
} from './actions';

import {saveComment} from '../apiService';

const getCurrentArticle = (state) => state.articleItem && state.articleItem.article;


export function* saveCommentSaga(action) {
  yield put(saveCommentStart());
  try {
    const comment = yield saveComment(action.params);
    const currentArticle = yield select(getCurrentArticle);
    if (currentArticle.id === comment.postId) {
      yield put(saveCommentSuccess(comment));
    }
  } catch (error) {
    yield put(saveCommentFailure(error));
  }
}


export function* watchComment() {
  yield takeEvery(SAVE_COMMENT, saveCommentSaga);
}
