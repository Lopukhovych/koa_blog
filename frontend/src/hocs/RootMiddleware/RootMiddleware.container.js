import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {getStorageItem} from 'src/utils/others';
import {initializeUser as initializeUserAction} from './redux/actions';

class RootMiddlewareContainer extends PureComponent {
  componentDidMount() {
    const {initializeUser} = this.props;

    if (getStorageItem('token')) {
      initializeUser();
    }
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = {
  initializeUser: initializeUserAction,
};

export default connect(null, mapDispatchToProps)(RootMiddlewareContainer);
