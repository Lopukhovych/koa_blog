import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadArticleList } from './redux/actions';

import ArticleListWrapperView from './ArticleListWrapper.view';

class ArticleListWrapperContainer extends PureComponent {
  componentDidMount() {
    const { loadArticleList } = this.props;
    loadArticleList();
  }

  render() {
    const { articleList } = this.props;
    return (
      <ArticleListWrapperView articleList={articleList} />
    );
  }
}

const mapStateToProps = ({ articleList }) => ({
  articleList: articleList.articleList,
});

const mapDispatchToProps = ({
  loadArticleList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListWrapperContainer);
