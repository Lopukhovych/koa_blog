import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import { loadArticle } from './redux/actions';

import ArticleItemView from './ArticleItem.view';

class ArticleItemContainer extends PureComponent {
  componentDidMount() {
    const { match, loadArticle } = this.props;
    if (match.params && match.params.id) {
      loadArticle(+match.params.id);
    }
  }

  render() {
    const {match, article, error} = this.props;
    console.log('article: ', article);
    console.log('error: ', error, match);
    if (error && error.code === 404) {
      return <Redirect to="/article/not-found" />;
    }
    return (
      <ArticleItemView article={article} />
    );
  }
}

const mapStateToProps = ({articleItem}) => ({
  article: articleItem.article,
  error: articleItem.error,
});


const mapDispatchToProps = ({
  loadArticle,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItemContainer);
