import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {initializeUser as initializeUserAction} from './redux/actions';

class RootMiddlewareContainer extends PureComponent {
  componentDidMount() {
    const {initializeUser} = this.props;
    initializeUser();
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = {
  initializeUser: initializeUserAction,
};

export default connect(null, mapDispatchToProps)(RootMiddlewareContainer);
