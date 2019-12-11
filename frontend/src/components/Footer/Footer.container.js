import React, {PureComponent} from 'react';
import {categoryList, subscribeInfo} from 'src/MockedData/footer.mocked';

import logo from 'src/assert/img/koa_blog_logo.svg';
import FooterView from './Footer.view';

class FooterContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.fullYear = new Date().getFullYear();
  }

  render() {
    return (
      <FooterView
        categoryList={categoryList}
        subscribeInfo={subscribeInfo}
        fullYear={this.fullYear}
        footerLogo={logo}
      />
    );
  }
}

export default FooterContainer;
