import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import Loading from 'src/components/Loading';
import { loadArticle, resetArticle } from './redux/actions';

import ArticleItemView from './ArticleItem.view';

class ArticleItemContainer extends PureComponent {
  componentDidMount() {
    const { match, loadArticle } = this.props;
    if (match.params && match.params.id) {
      loadArticle(+match.params.id);
    }
  }

  componentWillUnmount() {
    const {resetArticle} = this.props;
    resetArticle();
  }

  render() {
    const {
      article, error, pending, authorized, commentList,
    } = this.props;

    if (error && (error.code === 404 || error.code === 400)) {
      return <Redirect to="/article/not-found" />;
    }

    if (pending) {
      return <Loading />;
    }

    return article && <ArticleItemView authorized={authorized} article={article} commentList={commentList} />;
  }
}

const mapStateToProps = ({
  articleItem: {
    pending, article, error, commentList,
  }, userData: {authorized},
}) => ({
  pending,
  article,
  commentList,
  error,
  authorized,
});


const mapDispatchToProps = ({
  loadArticle,
  resetArticle,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleItemContainer);
