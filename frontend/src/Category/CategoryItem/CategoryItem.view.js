/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Commercials from 'src/Commercials';
import PropTypes from 'prop-types';

const categoryWrapperStyle = css({
  width: '100%',
  padding: '16px',
  '& h2': {
    fontSize: '40px',
    textTransform: 'capitalize',
  },
});

const categoryDescriptionStyle = css({
  fontSize: '20px',
  margin: '24px 8px',
});

const contentWrapperStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  margin: '20px 0',
});

const articleWrapperStyle = css({
  width: '78%',
  margin: '0 1%',
  boxSizing: 'border-box',
  padding: '12px 8px',
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


const articleStyle = css({
  maxHeight: '300px',
  margin: '0 0 16px',
  padding: '0 2px',

  '& .article': {
    padding: '12px',
    height: '200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    position: 'relative',
    paddingLeft: '41%',
    cursor: 'pointer',
    flexDirection: 'column',
    '& > p': {
      fontSize: '12px',
    },
  },

  '& .article-img': {
    display: 'block',
    overflow: 'hidden',
    position: 'absolute',
    top: '2px',
    height: '95%',
    width: '40%',
    minWidth: '120px',
    zIndex: 1,

    '&:hover > img': {
      transform: 'scale(1.1)',
    },

    '& > img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      transition: '1.6s transform',
      borderRadius: '4px',
    },
  },

  '& .article-body': {
    paddingLeft: '5px',
  },

  '& .article-title': {
    fontSize: '18px',
    marginBottom: 0,
    maxWidth: '95%',
    maxHeight: '76px',
    overflow: 'hidden',
    lineHeight: '25px',
  },


  '& .article-category': {
    fontSize: '12px',
  },

  '& .article-meta': {
    listStyleType: 'none',
    position: 'absolute',
    bottom: '10px',
    right: '0',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: '0 24px 0 0',

    '& li': {
      fontSize: '15px',
      margin: '0 0 0 12px',
    },
  },
});

const transformPostList = (postList) => postList && postList.map((article) => (
  <Card
    key={article.id}
    className="align-self-stretch"
    css={articleStyle}
  >
    <Link className="article-img" to={`/article/${article.id}`}>
      <img src={article.imageUrl} alt="" />
    </Link>
    <Card.Body className="article">
      <h3 className="article-title">
        <Link to={`/article/${article.id}`}>
          {article.title}
        </Link>
      </h3>
      <p>
        View number:
        {' '}
        {article.viewNumber}
      </p>
    </Card.Body>
    <ul className="article-meta">
      <li>
        <Link to={`/author/${article.userId}`}>
          {article['author.name'] ? article['author.name'] : article['author.email']}
        </Link>
      </li>
      <li>{article.publishedDate.toString()}</li>
    </ul>
  </Card>
));

const CategoryItemView = ({categoryInfo}) => (
  <>
    <Card css={categoryWrapperStyle}>
      <h2>{categoryInfo.title}</h2>
      <p css={categoryDescriptionStyle}>
        {categoryInfo.description}
      </p>
    </Card>
    <div css={contentWrapperStyle}>
      <Card css={articleWrapperStyle}>
        {categoryInfo.postList ? transformPostList(categoryInfo.postList) : <div />}
      </Card>
      <Commercials />
    </div>
  </>
);

CategoryItemView.propTypes = {
  categoryInfo: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    postList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      imageUrl: PropTypes.string,
      publishedDate: PropTypes.string,
      userId: PropTypes.number,
      viewNumber: PropTypes.number,
      'author.email': PropTypes.string,
      'author.name': PropTypes.string,
    })),
  }).isRequired,
};

export default CategoryItemView;
