/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

const articleItem = css({
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
  },
});

const ArticleListView = ({articleList}) => {
  const articles = articleList.map((article) => (
    <Link key={article.id} css={articleItem} to={`/article/${article.id}`}>
      <Jumbotron>
        { article.imageUrl && <img className="article-img" src={article.imageUrl} alt="article" />}
        <h5 className="article-title">{article.title}</h5>
        <span className="article-publish">{new Date(article.publishedDate).toDateString()}</span>
      </Jumbotron>
    </Link>
  ));
  return (
    <>
      {articles}
    </>
  );
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
  ).isRequired,
};

export default ArticleListView;
