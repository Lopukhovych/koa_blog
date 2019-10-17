import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configureStore from './config/configureStore';
import sagaMiddleware, {createSaga} from './config/configSaga';

import App from './App';

import './index.css';

const initialState = {};

const store = configureStore(initialState);
sagaMiddleware.run(createSaga());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
