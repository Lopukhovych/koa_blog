import React, {PureComponent} from 'react';
import MyProfileView from './MyProfile.view';

class MyProfileContainer extends PureComponent {
  render() {
    return (
      <MyProfileView title="MyProfileView" />
    );
  }
}

export default MyProfileContainer;
