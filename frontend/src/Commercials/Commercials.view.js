/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

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

const CommercialsView = () => (
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
);

export default CommercialsView;
