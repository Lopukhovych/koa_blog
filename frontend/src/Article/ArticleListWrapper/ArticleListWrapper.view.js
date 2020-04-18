/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React, {useMemo} from 'react';
import { Card, Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Commercials from 'src/Commercials';
import Error from 'src/components/Error';

import ArticleListView from './ArticleList/ArticleList.view';

const articleListStyle = css({
  width: '70%',
  margin: '0 1%',
  boxSizing: 'border-box',
  '& .card-title': {
    fontSize: '32px',
    textAlign: 'center',
  },
  '& .card-subtitle': {
    fontSize: '16px',
    color: '#9E9E9E',
    textAlign: 'center',
    margin: '12px 0 28px',
  },
});

const getPagination = ({current, pages, loadPage}) => {
  // TODO Refactor pagination code with <Pagination.Ellipsis />
  const items = [];
  for (let page = 1; page <= pages; page++) {
    items.push(
      <Pagination.Item
        key={page}
        data-index={page}
        dataset={{id: page}}
        active={page === current}
      >
        {page}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination onClick={loadPage}>
      <Pagination.First data-index={1} disabled={current === 1} />
      { current > 2 ? <Pagination.Prev dataset={{id: 1}} data-index={current - 1} /> : null}
      {items}
      { current < pages - 1 ? <Pagination.Next data-index={current + 1} /> : null}
      <Pagination.Last data-index={pages} disabled={current === pages} />
    </Pagination>
  );
};

const ArticleListWrapperView = ({articleList, articleDetails: {current, pages}, loadPage}) => {
  const pagination = useMemo((() => getPagination({current, pages, loadPage})), [current, pages, loadPage]);

  if (!articleList || !articleList.length) {
    return <Error />;
  }
  return (
    <>
      <Card css={articleListStyle}>
        <Card.Body>
          <Card.Title>Article list</Card.Title>
          <Card.Subtitle>{new Date().toDateString()}</Card.Subtitle>
          <ArticleListView articleList={articleList} />
          {pagination}
        </Card.Body>
      </Card>
      <Commercials />
    </>
  );
};

ArticleListView.propTypes = {
  articleList: PropTypes.arrayOf(PropTypes.any).isRequired,
  articleListDetails: PropTypes.shape({
    current: PropTypes.number,
    pages: PropTypes.number,
  }),
  loadPage: PropTypes.func,
};

ArticleListView.defaultProps = {
  articleListDetails: {
    current: 1,
    pages: 1,
  },
  loadPage: () => {},
};

export default ArticleListWrapperView;
