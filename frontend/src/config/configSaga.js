import createSagaMiddleware from 'redux-saga';
import {all, call, fork} from 'redux-saga/effects';


const sagaMiddleware = createSagaMiddleware({
  onError: (error, errorInfo) => {
    console.error(
      'Saga had an error and is now stopped.',
      errorInfo.sagaStack,
      error,
    );
  },
});

export default sagaMiddleware;


// import {
//     isLoggedIn,
//     watchLoginAccount,
//     watchLogoutAccount,
//     watchRegisterAccount,
//     watchResetPassword,
//     watchResetPasswordRequest
// } from './auth';
// import {watchCompanies, watchUsers} from './user';

export function createSaga() {
  return function* () {
    console.log('saga connected: ');
    yield all([
      // fork(watchCompanies),
      // fork(watchLoginAccount),
      // fork(watchLogoutAccount),
      // fork(watchRegisterAccount),
      // fork(watchUsers),
      // fork(watchResetPasswordRequest),
      // fork(watchResetPassword)
    ]);

    // yield all([call(isLoggedIn)]);
  };
}
