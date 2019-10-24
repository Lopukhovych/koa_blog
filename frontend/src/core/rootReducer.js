import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import login from 'src/components/Login/redux/state';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  login,
  // rest of your reducers
});

export default createRootReducer;
