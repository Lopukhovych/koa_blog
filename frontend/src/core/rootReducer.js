import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import userData from 'src/core/redux/user-data';
import login from 'src/components/Login/redux/reducer';
import signUp from 'src/components/SignUp/redux/reducer';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  userData,
  login,
  signUp,
  // rest of your reducers
});

export default createRootReducer;
