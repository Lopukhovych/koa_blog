import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import sagaMiddleware from './configSaga';

import createRootReducer from '../core/rootReducer';


export const history = createBrowserHistory();

const enhancers = [sagaMiddleware];

// if (process.env.NODE_ENV === 'development') {
//     // eslint-disable-next-line no-underscore-dangle
//     const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
//
//     if (typeof devToolsExtension === 'function') {
//         enhancers.push(devToolsExtension());
//     }
// }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composedEnhancers = compose(
//     applyMiddleware(
//         routerMiddleware(history), // for dispatching history actions
//         ...enhancers,
//         // ... other middlewares ...
//     ),
// );


export default function configureStore(preloadedState) {
  return createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(
      routerMiddleware(history),
      ...enhancers,
    )),
  );
  // const store = createStore(
  //     createRootReducer(history), // root reducer with router state
  //     preloadedState,
  //     composedEnhancers,
  // );
  // return store;
}
