import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import MyProfileView from './MyProfile.view';

class MyProfileContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(nextProp) {
    const {userData, history} = nextProp;
    if (!userData) {
      history.push('/');
    }
    return null;
  }

  render() {
    return (
      <MyProfileView title="MyProfileView" />
    );
  }
}

const mapStateToProps = ({userData}) => ({
  userData: userData.userData,
});

export default connect(mapStateToProps)(MyProfileContainer);
