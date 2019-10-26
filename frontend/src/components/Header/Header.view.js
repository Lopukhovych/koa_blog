/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import {Link} from 'react-router-dom';
import {
  Navbar, Nav, Form, FormControl, Button, OverlayTrigger, Popover, Image,
} from 'react-bootstrap';
import LoginContainer from 'src/components/Login';

import {mq, smallDesktop} from 'src/core/styles';
import { FaUser } from 'react-icons/fa';
import logo from './koa_blog_logo.svg';

const logoStyle = css({
  height: '40px',
  [mq[smallDesktop]]: {
    height: '38px',
  },
});
const popoverStyle = css({
  marginTop: '8px',
  width: '218px',
  '.arrow': {
    display: 'none',
  },
});
const logoWrapper = css({
  color: 'rgb(255, 255, 255)',
  height: '40px',
  width: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(0, 120, 212)',
  borderRadius: '50%',
  margin: '0 10px',
  cursor: 'pointer',
});

const HeaderView = ({
  popoverRef, closeHeaderPopover, userData, signOutHandler,
}) => (
  <Navbar bg="light" variant="light">
    <Navbar.Brand as={Link} to="/">
      <img css={logoStyle} src={logo} alt="koa_blog" />
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/category">Categories</Nav.Link>
      <Nav.Link as={Link} to="/author">Authors</Nav.Link>
      <Nav.Link as={Link} to="/about_us">About us</Nav.Link>
      <Nav.Link as={Link} to="/contact_us">Contacts</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-primary">Search</Button>
    </Form>
    {userData
      ? (
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom-end"
          rootClose
          ref={popoverRef}
          overlay={(
            <Popover id="login-popover" css={popoverStyle}>
              <Popover.Title as="h3">Profile</Popover.Title>
              <Popover.Content>
                <p>
                    Name:&nbsp;
                  {userData.name}
                </p>
                <p>
                    Email:&nbsp;
                  {userData.email}
                </p>
                <hr />
                <Link to="/myprofile">
                  <Button
                    onClick={closeHeaderPopover}
                    className="col col-xs-12 col-sm-8"
                    variant="outline-info"
                  >
                        My Profile
                  </Button>
                </Link>
                <hr />
                <Button
                  onClick={signOutHandler}
                  className="col col-xs-12 col-sm-6"
                  variant="outline-danger"
                >
                  Sign out
                </Button>
              </Popover.Content>
            </Popover>
          )}
        >
          <div css={logoWrapper}>
            <FaUser />
          </div>
        </OverlayTrigger>
      )
      : (
        <OverlayTrigger
          trigger="click"
          key="bottom"
          placement="bottom-end"
          rootClose
          ref={popoverRef}
          overlay={(
            <Popover id="login-popover" css={popoverStyle}>
              <Popover.Title as="h3">Log In</Popover.Title>
              <Popover.Content>
                <LoginContainer />
                <hr />
                <Link to="/auth">
                  <Button
                    onClick={closeHeaderPopover}
                    className="col col-xs-12 col-sm-6"
                    variant="outline-info"
                  >
                                Sign Up
                  </Button>
                </Link>
              </Popover.Content>
            </Popover>
          )}
        >
          <Button className="ml-2" variant="outline-primary">
                Log in
          </Button>
        </OverlayTrigger>
      )}
  </Navbar>
);

export default HeaderView;
