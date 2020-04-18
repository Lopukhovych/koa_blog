/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

const articleItemStyles = css({
  '& .jumbotron': {
    padding: '1rem',
    marginBottom: '20px',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
  },
  '& .article-img': {
    maxHeight: '200px',
    maxWidth: '400px',
    objectFit: 'contain',
    marginRight: '12px',
  },
  '& .article-title': {
    width: '80%',
    maxWidth: '600px',
    margin: 0,
  },
  '& .article-publish': {
    position: 'absolute',
    right: '1rem',
    bottom: '1rem',
    '& span': {
      margin: '0 4px',
    },
  },
});

const ArticleListView = ({articleList}) => (
  <>
    {articleList.map((article) => (
      <Link key={article.id} css={articleItemStyles} to={`/article/${article.id}`}>
        <Jumbotron>
          { article.imageUrl && <img className="article-img" src={article.imageUrl} alt="article" />}
          <h5 className="article-title">{article.title}</h5>
          <p className="article-publish">
            <span>
              Views:
              {' '}
              {article.viewNumber}
            </span>
            <span>{new Date(article.publishedDate).toDateString()}</span>
          </p>
        </Jumbotron>
      </Link>
    ))}
  </>
);

ArticleListView.defaultProps = {
  articleList: [],
};

ArticleListView.propTypes = {
  articleList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
      imageUrl: PropTypes.string,
      publishedDate: PropTypes.string,
      status: PropTypes.string,
      viewNumber: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      author: PropTypes.shape({
        id: PropTypes.number,
        email: PropTypes.string,
      }),
      category: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
      }),
    }),
  ),
};

export default ArticleListView;