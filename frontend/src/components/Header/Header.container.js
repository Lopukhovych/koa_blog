import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import HeaderView from './Header.view';

class HeaderContainer extends PureComponent {
    popoverRef = React.createRef();

    componentDidUpdate(prevProps) {
      const {userData} = this.props;
      if (userData && userData !== prevProps.userData) {
        this.closeLoginPopover();
      }
    }

    closeLoginPopover = () => {
      this.popoverRef.current.hide();
    };


    render() {
      return (
        <HeaderView
          popoverRef={this.popoverRef}
          closeLoginPopover={this.closeLoginPopover}
        />
      );
    }
}

const mapStateToProps = ({login}) => ({
  userData: login.userData,
});

export default connect(mapStateToProps)(HeaderContainer);
