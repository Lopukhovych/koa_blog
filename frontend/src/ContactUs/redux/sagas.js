import { call, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_CONTACT_US,
  CONTACT_US_SEND_MESSAGE,
  loadContactUsStart,
  loadContactUsSuccess,
  loadContactUsFail,
  contactUsSendMessageStart,
  contactUsSendMessageSuccess,
  contactUsSendMessageFailure,
} from './actions';

import {loadContactUs, leaveMessage} from '../api';

export function* loadContactUsSaga() {
  yield put(loadContactUsStart());
  try {
    const contactUsData = yield call(loadContactUs);
    yield put(loadContactUsSuccess(contactUsData));
  } catch (error) {
    yield put(loadContactUsFail(error));
  }
}

export function* sendContactUsMessage(params) {
  yield put(contactUsSendMessageStart());
  try {
    yield call(leaveMessage, params.data);
    yield put(contactUsSendMessageSuccess());
  } catch (error) {
    yield put(contactUsSendMessageFailure());
  }
}

export function* watchContactUs() {
  yield takeEvery(LOAD_CONTACT_US, loadContactUsSaga);
  yield takeEvery(CONTACT_US_SEND_MESSAGE, sendContactUsMessage);
}
