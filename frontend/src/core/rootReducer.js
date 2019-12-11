import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import userData from 'src/core/redux/user-data';
import login from 'src/components/Login/redux/reducer';
import signUp from 'src/components/SignUp/redux/reducer';
import forgotPassword from 'src/components/ForgotPassword/redux/reducer';
import articleItem from 'src/Article/ArticleItem/redux/reducer';
import articleList from 'src/Article/ArticleListWrapper/redux/reducer';
import articleCommentForm from 'src/Article/ArticleItem/CommentForm/redux/reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  userData,
  login,
  signUp,
  forgotPassword,
  articleItem,
  articleList,
  articleCommentForm,
});

export default createRootReducer;
