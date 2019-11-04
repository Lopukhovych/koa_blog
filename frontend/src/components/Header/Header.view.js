/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import {Link} from 'react-router-dom';
import {
  Navbar, Nav, Form, FormControl, Button, OverlayTrigger, Popover,
} from 'react-bootstrap';
import LoginContainer from 'src/components/Login';

import {mq, smallDesktop} from 'src/core/styles';
import { FaUser } from 'react-icons/fa';

const logoStyles = css({
  height: '40px',
  [mq[smallDesktop]]: {
    height: '38px',
  },
});
const popoverStyles = css({
  marginTop: '8px',
  width: '218px',
  '.arrow': {
    display: 'none',
  },
});
const logoWrapperStyles = css({
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
  '&:hover': {
    cursor: 'pointer',
  },
});
const forgotPasswordLinkStyles = css({
  display: 'inline-block',
  marginTop: '4px',
  fontSize: '13px',
});

const HeaderView = ({
  popoverRef, closeHeaderPopover, userData, signOutHandler, headerLogo,
}) => (
  <Navbar bg="light" variant="light">
    <Navbar.Brand as={Link} to="/">
      <img css={logoStyles} src={headerLogo} alt="koa_blog" />
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
            <Popover id="login-popover" css={popoverStyles}>
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
          <div css={logoWrapperStyles}>
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
            <Popover id="login-popover" css={popoverStyles}>
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
                <br />
                <Link
                  onClick={closeHeaderPopover}
                  css={forgotPasswordLinkStyles}
                  to="/auth/forgot"
                >
                  Forgot password?
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
