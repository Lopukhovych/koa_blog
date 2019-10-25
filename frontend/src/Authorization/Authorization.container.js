import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
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
    return (
      <AuthorizationView />
    );
  }
}
const mapStateToProps = ({userData}) => ({
  userData: userData.userData,
});

export default connect(mapStateToProps)(AuthorizationContainer);
