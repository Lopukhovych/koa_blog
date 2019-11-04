/** @jsx jsx */
import {css, jsx} from '@emotion/core';

import {Card, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const smallArticleStyles = css({
  height: '13%',
  maxHeight: '75px',

  '& .article': {
    padding: '5px',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'start',
    position: 'relative',
    paddingLeft: '120px',
    cursor: 'pointer',
    flexDirection: 'column',
  },

  '& .article-img': {
    display: 'block',
    overflow: 'hidden',
    position: 'absolute',
    top: '2px',
    height: '95%',
    width: '120px',
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
    },
  },

  '& .article-body': {
    paddingLeft: '5px',
  },

  '& .article-title': {
    fontSize: '14px',
    marginBottom: '0',
    maxWidth: '266px',
    maxHeight: '32px',
    overflow: 'hidden',
  },

  '& .article-category': {
    fontSize: '12px',
  },

  '& .article-meta': {
    'list-style-type': 'none',
    position: 'absolute',
    bottom: '1px',
    right: '0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 10px',

    '& li': {
      fontSize: '12px',
      margin: '0 0 0 12px',
    },
  },
});

const mainArticleCardStyles = css({
  minHeight: '600px',
  boxSizing: 'border-box',
  padding: '5px',
  position: 'relative',

  '& .article': {
    position: 'relative',
    display: 'block',
    padding: '1.25rem',
    flex: '0',
  },

  '& .article-img': {
    display: 'block',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',

    '&:hover > img': {
      transform: 'scale(1.05)',
    },

    '& > img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: '1.6s transform',
    },
  },

  '& .article-body': {
    paddingLeft: '5px',
  },

  '& .article-title': {
    fontSize: '24px',
    marginBottom: '0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#007bff',

    '&:hover': {
      color: '#0056b3',
    },
  },

  '& .article-category': {
    fontSize: '20px',
  },

  '& .article-meta': {
    'list-style-type': 'none',
    position: 'absolute',
    bottom: '1px',
    right: '0',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'column',
    margin: '0 10px',

    '& li': {
      fontSize: '16px',
      margin: '0 12px',
      color: '#fff',
    },
  },
});

const allPopularArticleLink = css({
  margin: '4px 12px',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
  '& h6': {
    margin: 0,
  },
});

const HomePopularNewsView = ({ articleList}) => {
  const popularArticles = articleList.filter((elem, index) => index < 8).map((article, articleIndex) => (
    <Card
      key={article.id}
      className={articleIndex === 0 ? 'col-7' : 'align-self-stretch'}
      css={articleIndex === 0 ? mainArticleCardStyles : smallArticleStyles}
    >
      <Link className="article-img" to={`/article/${article.id}`}>
        <img src={article.imgLink} alt="" />
      </Link>
      <Card.Body className="article">
        <div className="article-category">
          {article.categoryList.map((category) => (
            <Link key={category.link} to={`/category/${category.link}`}>
              {category.name}
              ;&nbsp;
            </Link>
          ))}
        </div>
        <h3 className="article-title">
          <Link to={`/article/${article.id}`}>
            {article.title}
          </Link>
        </h3>
      </Card.Body>
      <ul className="article-meta">
        <li><Link to={`/author/${article.author.id}`}>{article.author.name}</Link></li>
        <li>{article.date.toDateString()}</li>
      </ul>
    </Card>
  ));

  const firstArticle = popularArticles[0];
  const asideArticles = popularArticles.slice(1);

  return (
    <Container fluid>
      <Row className="d-flex flex-row">
        <div className="col-5 d-flex flex-column justify-content-between">
          <h4>Popular News</h4>
          {asideArticles}
          <Link to="/article" css={allPopularArticleLink}>
            <h6>All popular articles</h6>
          </Link>
        </div>
        {firstArticle}
      </Row>
    </Container>
  );
};

export default HomePopularNewsView;
