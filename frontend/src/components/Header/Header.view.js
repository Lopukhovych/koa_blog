/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import {Link} from 'react-router-dom';
import {
  Navbar, Nav, Form, FormControl, Button, OverlayTrigger, Popover,
} from 'react-bootstrap';
import Input from 'src/components/Input';

import {mq, smallDesktop} from 'src/core/styles';
import logo from './koa_blog_logo.svg';

const logoStyle = css({
  height: '40px',
  // [mq[smallDesktop]]: {
  //   background: 'red',
  // },
});
const popoverStyle = css({
  marginTop: '8px',
  '.arrow': {
    display: 'none',
  },
});

const inputStyle = css({
  border: '1px solid green',
});

const HeaderView = ({
  title, popoverRef, closeLoginPopover, controls, formIsValid, changeFormValueHandler, submitFormHandler,
}) => {
  const formElementsArray = [];
  Object.entries(controls).forEach((control) => {
    formElementsArray.push({
      id: control[0],
      config: control[1],
    });
  });
  const form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      f={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      label={formElement.config.elementConfig.placeholder}
      shouldValidate={formElement.config.validation}
      css={inputStyle}
      errorMessage={formElement.errorMessage}
      touched={formElement.config.touched}
      onChange={(event) => changeFormValueHandler(event.target.value, formElement.id)}
    />
  ));
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href="/">
        <img css={logoStyle} src={logo} alt="koa_blog" />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">{title}</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-primary">Search</Button>
      </Form>
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
              <Form onSubmit={submitFormHandler}>
                {form}
                <Button disabled={!formIsValid} variant="primary" type="submit">Log In</Button>
              </Form>
              <hr />
              <Link to="/auth">
                <Button onClick={closeLoginPopover} variant="outline-info">
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
    </Navbar>
  );
};

export default HeaderView;
