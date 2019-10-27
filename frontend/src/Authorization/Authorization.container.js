import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Route, Switch} from 'react-router';
import ForgotPasswordContainer from 'src/components/ForgotPassword';
import AuthorizationView from './Authorization.view';


class AuthorizationContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProp) {
    const {userData, history} = nextProp;
    if (userData && Object.keys(userData).length) {
      history.push('/');
    }
    return null;
  }

  render() {
    const {match} = this.props;
    return (
      <Switch>
        <Route path={`${match.path}/forgot`} component={ForgotPasswordContainer} />
        <Route exact path={match.path}>
          <AuthorizationView />
        </Route>
      </Switch>
    );
  }
}
const mapStateToProps = ({userData}) => ({
  userData: userData.userData,
});

export default connect(mapStateToProps)(AuthorizationContainer);
