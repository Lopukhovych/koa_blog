import {all, fork} from 'redux-saga/effects';
import {watchLogin} from 'src/components/Login/redux/sagas';
import {watchSignUp} from 'src/components/SignUp/redux/sagas';
import {watchInitialize} from 'src/hocs/RootMiddleware/redux/sagas';

export default function createSaga() {
  return function* () {
    console.log('saga connected: ');
    yield all([
      fork(watchLogin),
      fork(watchSignUp),
      fork(watchInitialize),
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
