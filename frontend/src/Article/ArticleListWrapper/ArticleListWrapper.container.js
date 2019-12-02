import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { loadArticleList } from './redux/actions';

import ArticleListWrapperView from './ArticleListWrapper.view';

class ArticleListWrapperContainer extends PureComponent {
  componentDidMount() {
    const { loadArticleList, section, match} = this.props;
    console.log('match: ', match);
    console.log('section: ', section);
    loadArticleList();
  }

  render() {
    const { articleList } = this.props;
    console.log('articleList111: ', articleList);
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
