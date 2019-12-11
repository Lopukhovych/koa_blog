/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

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

const commercialStyle = css({
  width: '26%',
  margin: '0 4px',
  height: '400px',
  '& .card-footer': {
    padding: '0.6rem 0.5rem',
    display: 'flex',
    alignItems: 'center',
    '& small': {
      margin: '0 10px 0 0',
    },
  },
});

const ArticleListWrapperView = ({articleList}) => (
  <>
    <Card css={articleListStyle}>
      <Card.Body>
        <Card.Title>Article list</Card.Title>
        <Card.Subtitle>{new Date().toDateString()}</Card.Subtitle>
        <ArticleListView articleList={articleList} />
      </Card.Body>
    </Card>
    <Card css={commercialStyle}>
      <Card.Header>
          Сommercial
      </Card.Header>
      <Card.Body>
        <Card.Text>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted"><Link to="/contact_us">Contact Us</Link></small>
        <small className="text-muted"><Link to="/about_us">About Us</Link></small>
      </Card.Footer>
    </Card>
  </>
);

ArticleListView.propTypes = {
  articleList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ArticleListWrapperView;
