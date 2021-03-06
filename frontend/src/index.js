import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configureStore from './config/configureStore';
import sagaMiddleware from './config/configSaga';
import createSaga from './core/rootSaga';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

import App from './App';

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
