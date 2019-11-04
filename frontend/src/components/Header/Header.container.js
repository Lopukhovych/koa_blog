import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {signOutUser as signOutUserAction} from 'src/core/redux/actions';

import logo from 'src/assert/img/koa_blog_logo.svg';

import HeaderView from './Header.view';

class HeaderContainer extends PureComponent {
    popoverRef = React.createRef();

    componentDidUpdate(prevProps) {
      const {userData} = this.props;
      if (userData && userData !== prevProps.userData) {
        this.closeHeaderPopover();
      }
    }

    closeHeaderPopover = () => {
      this.popoverRef.current && this.popoverRef.current.hide();
    };

    signOutHandler = () => {
      const {signOutUser} = this.props;
      signOutUser();
      this.closeHeaderPopover();
    };


    render() {
      const {userData} = this.props;
      return (
        <HeaderView
          userData={userData}
          popoverRef={this.popoverRef}
          closeHeaderPopover={this.closeHeaderPopover}
          signOutHandler={this.signOutHandler}
          headerLogo={logo}
        />
      );
    }
}

const mapStateToProps = ({userData}) => ({
  userData: userData.userData,
});
const mapDispatchToProps = {
  signOutUser: signOutUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
