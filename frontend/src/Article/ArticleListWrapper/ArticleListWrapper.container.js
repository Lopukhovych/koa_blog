import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadArticleList } from './redux/actions';

import ArticleListWrapperView from './ArticleListWrapper.view';


function ArticleListWrapperContainer({
  articleList,
  articleListDetails,
  loadArticleList,
  match,
  history,
}) {
  const [popular] = useState(match.url.search('popular') !== -1);
  const [queryParams] = useState(new URLSearchParams(history.location.search));
  useEffect(() => {
    const page = queryParams.get('page') || 1;
    loadArticleList({popular, page});
  }, []);

  const loadPage = async (event) => {
    const page = (event.target && event.target.dataset && event.target.dataset.index) || 1;
    window.scroll({top: 0, left: 0, behavior: 'smooth' });
    queryParams.set('page', page);
    history.push({
      pathname: history.location.pathname,
      search: queryParams.toString(),
    });
    await loadArticleList({popular, page});
  };

  return (
    <ArticleListWrapperView
      articleList={articleList}
      articleDetails={articleListDetails}
      loadPage={loadPage}
    />
  );
}

const mapStateToProps = ({ articleList }) => ({
  articleList: articleList.articleList,
  articleListDetails: articleList.articleListDetails,
});

const mapDispatchToProps = ({
  loadArticleList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListWrapperContainer);
