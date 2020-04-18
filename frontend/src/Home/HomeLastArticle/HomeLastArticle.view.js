/** @jsx jsx */
import {css, jsx} from '@emotion/core';

import { Card, Container, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const cardWrapperStyles = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const cardItemStyles = css({
  padding: 0,
  margin: '0 0 2%',
  flex: '0 0 32%',
  maxWidth: '32%',
  '&:hover': {
    cursor: 'pointer',
  },
  '& span': {
    margin: '0 8px',
  },
});

const cardBodyStyles = css({
  height: '210px',
  overflow: 'hidden',

  '& .article-title': {
    marginBottom: '12px',
    height: '72px',
    overflow: 'hidden',
  },
  '& .article-category': {
    margin: '8px 4px',
    fontSize: '14px',
  },
  '& .article-info': {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    margin: '0 4px',
  },
});


const HomeLastArticleView = ({articleList}) => {
  const lastArticleList = articleList.filter((elem, index) => index < 6).map((article) => (
    <Card key={article.id} css={cardItemStyles} className="col-4">
      <Card.Img variant="top" src={article.imgLink} />
      <Card.Body css={cardBodyStyles}>
        <Card.Title className="article-title">
          {article.title}
        </Card.Title>
        <Link
          className="btn btn-primary"
          to={`/article/${article.id}`}
        >
            Read article
        </Link>
        <div className="article-category">
          Categories:&nbsp;
          {article.categoryList.map((category) => (
            <Link key={category.link} to={`/category/${category.link}`}>
              {category.name}
              ;&nbsp;
            </Link>
          ))}
        </div>
        <div className="article-info">
          <Link to={`/author/${article.author.id}`}>{article.author.name}</Link>
          <span>{article.date.toDateString()}</span>
        </div>
      </Card.Body>
    </Card>
  ));
  return (
    <Container fluid>
      <h2>
        <Link to="/article">Last articles</Link>
      </h2>
      <Row css={cardWrapperStyles}>
        {lastArticleList}
      </Row>
      <Link to="/article">
        <h6>Last Article list</h6>
      </Link>
    </Container>
  );
};

export default HomeLastArticleView;
