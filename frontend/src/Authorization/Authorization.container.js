import React, {PureComponent} from 'react';
import {Route, Switch, Redirect} from 'react-router';
import SignUpContainer from 'src/components/SignUp';
import LoginContainer from 'src/components/Login';


class AuthorizationContainer extends PureComponent {
  render() {
    const {match} = this.props;
    return (
      <div>
        <h2>AuthorizationContainer</h2>
        <Switch>
          <Route path={`${match.path}/login`} component={LoginContainer} />
          <Route path={`${match.path}/signup`} component={SignUpContainer} />
          <Route exact path={match.path}>
            <Redirect to={`${match.path}/login`} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default AuthorizationContainer;
