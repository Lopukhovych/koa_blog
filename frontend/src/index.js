import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom'; // react-router v4/v5
import {ConnectedRouter} from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import configureStore, {history} from './config/configureStore';
import sagaMiddleware, {createSaga} from './config/configSaga';

import PostContainer from './Post';
import App from './App';


import './index.css';

const initialState = {};

const store = configureStore(initialState);
sagaMiddleware.run(createSaga());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { /* place ConnectedRouter under Provider */}
      <>
        { /* your usual react-router v4/v5 routing */}
        <Switch>
          <Route exact path="/" render={App} />
          <Route path="/post" component={PostContainer} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
