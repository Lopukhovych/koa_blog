/** @jsx jsx */
import {css, jsx} from '@emotion/core';

import HomeLastArticleContainer from 'src/Home/HomeLastArticle';
import HomeSliderContainer from 'src/Home/HomeSlider';
import HomePopularNewsContainer from 'src/Home/HomePopularNews';


const containerWrapperStyles = css({
  width: '90%',
  margin: '0 auto',
  maxWidth: '1200px',
  minWidth: '700px',
  '& > div > h2': {
    margin: '32px 0 12px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
});


const HomeView = () => (
  <div css={containerWrapperStyles}>
    <HomePopularNewsContainer />
    <HomeLastArticleContainer />
    <HomeSliderContainer />
  </div>
);

export default HomeView;
