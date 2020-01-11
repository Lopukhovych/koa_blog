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

const reloadPageStyles = css({
  color: '#007bff',
  textDecoration: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});


function reloadPage() {
  window.location.reload();
}

const ErrorView = () => (
  <Card css={articleNotFoundStyles}>
    <h3>
      We apologise, but this page could not be loaded
      {' '}
      <span role="img" aria-label="Disappointed">😥</span>
      <br />
      You can
      {' '}
      <span
        css={reloadPageStyles}
        role="button"
        tabIndex={0}
        onKeyDown={reloadPage}
        onClick={reloadPage}
      >
      reload page
      </span>
      {' '}
      or go to
      {' '}
      <Link to="/">home</Link>
    </h3>
    <Link to="/">
      <Button variant="outline-primary">Go to home page</Button>
    </Link>
    <Link className="contact-us" to="/contact_us">Contact us</Link>
  </Card>
);

export default ErrorView;
