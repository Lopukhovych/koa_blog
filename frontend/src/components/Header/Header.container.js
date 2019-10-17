/** @jsx jsx */
import {css, jsx } from '@emotion/core';
import React, {PureComponent} from 'react';

const headerStyle = css({
  flexShrink: 0,
});

class HeaderContainer extends PureComponent {
  render() {
    return (
      <div css={headerStyle}>
        <p>header</p>
      </div>
    );
  }
}

export default HeaderContainer;
