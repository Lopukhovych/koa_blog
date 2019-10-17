import React, {PureComponent} from 'react';
import {Route, Switch} from 'react-router';
import AuthorView from './Author.view';
import AuthorItemContainer from './AuthorItem';

class AuthorContainer extends PureComponent {
  render() {
    const {match} = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/:id`} component={AuthorItemContainer} />
        <Route exact path={match.path}>
          <AuthorView title="AuthorView" />
          {/* <h3>Please select a topic.</h3> */}
        </Route>
      </Switch>

    );
  }
}

export default AuthorContainer;
