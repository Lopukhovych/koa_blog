/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import { Card } from 'react-bootstrap';
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

const ArticleListWrapperView = ({articleList}) => {
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
        </Card.Body>
      </Card>
      <Commercials />
    </>
  );
};

ArticleListView.propTypes = {
  articleList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ArticleListWrapperView;
