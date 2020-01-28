/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import {Card, Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Commercials from 'src/Commercials';
import propTypes from 'prop-types';

const articleListStyle = css({
  width: '70%',
  margin: '0 1%',
  boxSizing: 'border-box',
  '& .card-title': {
    fontSize: '32px',
    textAlign: 'center',
  },
  '& .card-subtitle': {
    fontSize: '16px 8px',
    color: '#9E9E9E',
    textAlign: 'center',
    margin: '12px 0 28px',
  },
});

const categoryWrapperStyle = css({
  padding: '16px',
});

const categoryHeaderStyle = css({
  textTransform: 'capitalize',
  '& h5': {
    fontSize: '28px',
  },
});
const categoryItemStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  height: '160px',
  '& > a': {
    flex: '1 0 calc(30% - 10px)',
    height: '100%',
    boxSizing: 'border-box',
    margin: '0 8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& img': {
      width: 'auto',
      height: 'calc(100% - 24px)',
    },
    '& > p': {
      display: 'inline-block',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});

const transformCategoryList = (categoryList) => categoryList && categoryList.map((category) => (
  <Jumbotron css={categoryWrapperStyle} key={category.id}>
    <Link css={categoryHeaderStyle} to={`/category/${category.id}`}>
      <h5>{category.title}</h5>
    </Link>
    <div css={categoryItemStyle}>
      {
        category.postList && category.postList.length
          ? category.postList.map((post) => (
            <Link key={post.id} to={`/article/${post.id}`}>
              <img src={post.imageUrl} alt="article" />
              <p>{post.title}</p>
            </Link>
          )) : null
      }
    </div>
  </Jumbotron>
));

const CategoryListView = ({categoryList}) => (
  <>
    <Card css={articleListStyle}>
      <Card.Body>
        <Card.Title>Category list</Card.Title>
        <Card.Subtitle>{new Date().toDateString()}</Card.Subtitle>
        { transformCategoryList(categoryList)}
      </Card.Body>
    </Card>
    <Commercials />
  </>
);

CategoryListView.propTypes = {
  categoryList: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    title: propTypes.string,
    postList: propTypes.arrayOf(propTypes.shape({
      id: propTypes.number,
      title: propTypes.string,
      imageUrl: propTypes.string,
    })),
  })).isRequired,
};

export default CategoryListView;
