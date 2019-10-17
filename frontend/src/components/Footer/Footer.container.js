/** @jsx jsx */
import React from 'react';
import {css, jsx } from '@emotion/core';

const footerStyle = css({
  flexShrink: 0,
});
const FooterContainer = () => (
  <div css={footerStyle}>
    <h2>Footer</h2>
  </div>
);

export default FooterContainer;
