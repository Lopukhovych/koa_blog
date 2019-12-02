/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import {Link} from 'react-router-dom';
import {
  Col, Container, Jumbotron, Nav, Row,
} from 'react-bootstrap';
import {getSocialLinkIcon} from 'src/utils/socialIcons';

import NewsletterWidgetContainer from 'src/components/NewsletterWidget';

const footerStyles = css({
  margin: '2% 0 0',
  padding: ' 12px',
});

const footerLogoStyles = css({
  margin: '4px 12px',
  '& img': {
    width: '125px',
  },
});

const footerWidgetStyles = css({
  marginBottom: '12px',
  marginTop: '8px',
  '& p': {
    marginBottom: '8px',
  },
  '& .footer-title': {
    color: '#000',
    fontSize: '18px',
    textTransform: 'uppercase',
  },
  '& .contact li i': {
    color: '#97989b',
    backgroundColor: '#353535',
    border: 'none',
  },
  '& .newsletter-widget': {
    padding: '0px',
    border: 'none',
    '&:after': {
      color: '#323335',
    },
  },
  '& .contact-social': {
    marginBottom: 0,
    display: 'flex',
    padding: 0,
    '& li': {
      display: 'inline-block',
      margin: '4px 16px',
    },
  },
});


const categoryWidgetStyles = css({
  '& ul': {
    paddingLeft: '16px',
    '& li': {
      listStyleType: 'none',
      padding: '4px 0px',
      fontSize: '14px',
      borderBottom: '1px solid #e8eaed',
      width: '60%',
      '& a': {
        display: 'block',
        textTransform: 'uppercase',
        fontWeight: '700',
        '& span': {
          float: 'right',
          fontSize: '14px',
          color: '#97989b',
          marginLeft: '15px',
        },
      },
    },
  },
});

const footerCopyrightStyles = css({
  fontSize: '12px',
  color: '#757575',
  textAlign: 'right',
});

const FooterView = ({
  categoryList, subscribeInfo, fullYear, footerLogo,
}) => {
  const socialNetworkIconList = subscribeInfo && subscribeInfo.socialNetworkList
    .map((item) => (<li key={item.title}>{getSocialLinkIcon(item)}</li>));
  const categoryLinkList = categoryList.map((category) => (
    <li key={category.link}>
      <Link to={`/category/${category.link}`}>
        {category.title}
        <span>{category.postAmount}</span>
      </Link>
    </li>
  ));
    // TODO add privacy page
  return (
    <Jumbotron fluid css={footerStyles}>
      <Container fluid>
        <Row>
          <Col xs={4} css={footerWidgetStyles}>
            <div css={footerLogoStyles}>
              <Link to="/home" className="logo"><img src={footerLogo} alt="blog logo" /></Link>
            </div>
            <p>{subscribeInfo.socialInfo}</p>
            <ul className="contact-social">
              {socialNetworkIconList}
            </ul>
          </Col>
          <Col xs={4} css={footerWidgetStyles}>
            <h3 className="footer-title">Categories</h3>
            <div css={categoryWidgetStyles}>
              <ul>
                {categoryLinkList}
              </ul>
            </div>
          </Col>
          <Col xs={3} css={footerWidgetStyles}>
            <h3 className="footer-title">Newsletter</h3>
            <NewsletterWidgetContainer
              infoTitle={subscribeInfo.title}
            />
          </Col>
        </Row>
        <Row className="align-items-center">
          <div className="offset-md-1 col-md-7 col-md-push-7">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/category">Categories</Nav.Link>
              <Nav.Link as={Link} to="/about_us">About us</Nav.Link>
              <Nav.Link as={Link} to="/contact_us">Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/contacts">Contacts</Nav.Link>
              <Nav.Link as={Link} to="/contact_us">Privacy</Nav.Link>
            </Nav>
          </div>
          <div className="col-md-4 col-md-pull-4">
            <p css={footerCopyrightStyles}>
                            Copyright &copy;
              {' '}
              {fullYear}
              {' '}
                            &nbsp;
                            All rights reserved
            </p>
          </div>
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default FooterView;
