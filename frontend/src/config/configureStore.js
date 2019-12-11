import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createRootReducer from 'src/core/rootReducer';
import sagaMiddleware from 'src/config/configSaga';

export const history = createBrowserHistory();

const enhancers = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState) {
  return createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
      ...enhancers,
    )),
  );
}
