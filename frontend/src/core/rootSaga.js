import {all, fork} from 'redux-saga/effects';
import {watchLogin} from 'src/components/Login/redux/sagas';
import {watchSignUp} from 'src/components/SignUp/redux/sagas';
import {restorePassword} from 'src/components/ForgotPassword/redux/sagas';
import {watchInitialize} from 'src/hocs/RootMiddleware/redux/sagas';
import {watchArticle} from 'src/Article/ArticleItem/redux/sagas';
import {watchComment} from 'src/Article/ArticleItem/CommentForm/redux/sagas';
import {watchArticleList} from 'src/Article/ArticleListWrapper/redux/sagas';
import {watchSignOut} from './redux/sagas';

export default function createSaga() {
  return function* () {
    console.log('saga connected: ');
    yield all([
      fork(watchLogin),
      fork(watchSignUp),
      fork(watchInitialize),
      fork(watchSignOut),
      fork(restorePassword),
      fork(watchArticle),
      fork(watchArticleList),
      fork(watchComment),
    ]);
  };
}
