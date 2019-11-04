import React, {Component} from 'react';
import {articleList} from 'src/MockedData/popularnews/popular.news';
import HomePopularNewsView from './HomePopularNews.view';

class HomePopularNewsContainer extends Component {
  render() {
    return (
      <HomePopularNewsView
        articleList={articleList}
      />
    );
  }
}

export default HomePopularNewsContainer;
