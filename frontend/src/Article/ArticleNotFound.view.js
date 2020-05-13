/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const articleNotFoundStyles = css({
  width: '100%',
  padding: '2rem',
  '& h3': {
    margin: '0 0 2rem',
  },
  '& .contact-us': {
    marginTop: '12px',
    lineHeight: '26px',
    width: '130px',
    marginLeft: '12px',
  },
});

const ArticleNotFoundView = () => (
  <Card css={articleNotFoundStyles}>
    <h3>
      We apologise, but the article was not found
      {' '}
      <span role="img" aria-label="Disappointed">😥</span>
    </h3>
    <Link to="/article">
      <Button variant="outline-primary">Go to Article list page</Button>
    </Link>
    <Link className="contact-us" to="/contact_us">Contact us</Link>
  </Card>
);

export default ArticleNotFoundView;
