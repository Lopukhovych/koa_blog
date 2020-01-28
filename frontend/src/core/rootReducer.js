import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import userData from 'src/core/redux/user-data';
import login from 'src/components/Login/redux/reducer';
import signUp from 'src/components/SignUp/redux/reducer';
import forgotPassword from 'src/components/ForgotPassword/redux/reducer';
import articleItem from 'src/Article/ArticleItem/redux/reducer';
import articleList from 'src/Article/ArticleListWrapper/redux/reducer';
import articleCommentForm from 'src/Article/ArticleItem/CommentForm/redux/reducer';
import aboutUs from 'src/AboutUs/redux/reducer';
import contactUs from 'src/ContactUs/redux/reducer';
import categoryList from 'src/Category/CategoryList/redux/reducer';
import category from 'src/Category/CategoryItem/redux/reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  userData,
  login,
  signUp,
  forgotPassword,
  articleItem,
  articleList,
  articleCommentForm,
  aboutUs,
  contactUs,
  categoryList,
  category,
});

export default createRootReducer;
