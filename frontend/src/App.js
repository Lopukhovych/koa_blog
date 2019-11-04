/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import {Route, Switch, Redirect} from 'react-router';
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
import RootMiddlewareContainer from 'src/hocs/RootMiddleware';

import {mq, smallDesktop} from 'src/core/styles';

import './App.css';

const rootStyles = css({
  minHeight: '100%',
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  alignItems: 'stretch',
  maxWidth: '1180px',
  margin: '0 auto',
  overflow: 'hidden',

  [mq[smallDesktop]]: {
    // background: 'red',
  },
});

const mainStyle = css({
  flex: '1 0 auto',
  margin: '8px 0 22px',
});

function App() {
  return (
    <div css={rootStyles}>
      <ConnectedRouter history={history}>
        <RootMiddlewareContainer>
          <Header />
          <main css={mainStyle}>
            <Switch>
              <Route exact path="/" component={HomeContainer} />
              <Redirect exact path="/home" to="/" />
              <Route path="/author" component={AuthorContainer} />
              <Route path="/article" component={ArticleContainer} />
              <Route path="/category" component={CategoryContainer} />
              <Route path="/about_us" component={AboutUsContainer} />
              <Route path="/contact_us" component={ContactUsContainer} />
              <Route path="/auth" component={AuthorizationContainer} />
              <Route path="/myprofile" component={MyProfileContainer} />
              <Route path="/not-fount" component={NotFoundContainer} />
              <Redirect from="*" to="/not-found" />
            </Switch>
          </main>
          <Footer />
        </RootMiddlewareContainer>
      </ConnectedRouter>
    </div>

  );
}

export default App;
