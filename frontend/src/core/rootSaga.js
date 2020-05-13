import {all, fork} from 'redux-saga/effects';
import {watchLogin} from 'src/components/Login/redux/sagas';
import {watchSignUp} from 'src/components/SignUp/redux/sagas';
import {restorePassword} from 'src/components/ForgotPassword/redux/sagas';
import {watchInitialize} from 'src/hocs/RootMiddleware/redux/sagas';
import {watchArticle} from 'src/Article/ArticleItem/redux/sagas';
import {watchComment} from 'src/Article/ArticleItem/CommentForm/redux/sagas';
import {watchArticleList} from 'src/Article/ArticleListWrapper/redux/sagas';
import {watchLoadUs} from 'src/AboutUs/redux/sagas';
import {watchContactUs} from 'src/ContactUs/redux/sagas';
import {watchCategoryList} from 'src/Category/CategoryList/redux/sagas';
import {watchCategory} from 'src/Category/CategoryItem/redux/sagas';
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
      fork(watchLoadUs),
      fork(watchArticleList),
      fork(watchComment),
      fork(watchContactUs),
      fork(watchCategoryList),
      fork(watchCategory),
    ]);
  };
}
