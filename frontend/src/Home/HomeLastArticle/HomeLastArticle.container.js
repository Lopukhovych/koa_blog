import React, {PureComponent} from 'react';
import {articleList} from 'src/MockedData/popularnews/popular.news';
import HomeLastArticleView from './HomeLastArticle.view';

class HomeLastArticleContainer extends PureComponent {
  render() {
    return (
      <HomeLastArticleView
        articleList={articleList}
      />
    );
  }
}

export default HomeLastArticleContainer;
