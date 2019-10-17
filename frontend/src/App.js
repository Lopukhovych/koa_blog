/** @jsx jsx */
import {css, jsx } from '@emotion/core';
import React from 'react';
import {Route, Switch} from 'react-router';
import {ConnectedRouter} from 'connected-react-router';

import {history} from 'src/config/configureStore';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';

import HomeContainer from 'src/Home';
import AuthorContainer from 'src/Author';
import ArticleContainer from 'src/Article';
import AboutUsContainer from 'src/AboutUs';
import ContactUsContainer from 'src/ContactUs';
import NotFoundContainer from 'src/NotFound';
import AuthorizationContainer from 'src/Authorization';
import MyProfileContainer from 'src/MyProfile';
import CategoryContainer from 'src/Category';

import './App.css';

const mainStyle = css({
  flex: '1 0 auto',
});

function App() {
  return (
    <ConnectedRouter history={history}>
      <Header />
      <main css={mainStyle}>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/author" component={AuthorContainer} />
          <Route path="/article" component={ArticleContainer} />
          <Route path="/category" component={CategoryContainer} />
          <Route path="/about_us" component={AboutUsContainer} />
          <Route path="/contact_us" component={ContactUsContainer} />
          <Route path="/auth" component={AuthorizationContainer} />
          <Route path="/myprofile" component={MyProfileContainer} />
          <Route path="*" component={NotFoundContainer} />
        </Switch>
      </main>
      <Footer />
    </ConnectedRouter>
  );
}

export default App;
