/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import {
  Button,
  Card, Col, Container, Form, Row,
} from 'react-bootstrap';

import Input from 'src/components/Input';

const formStyle = css({
  textAlign: 'left',
});

const errorMessageStyle = css({
  margin: '8px 0 4px',
  fontSize: '14px',
  color: 'red',
});

const ForgotPasswordView = ({
  controls, formIsValid, changeFormValueHandler, submitFormHandler, errorMessage,
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
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      label={formElement.config.elementConfig.placeholder}
      shouldValidate={formElement.config.validation}
      errorMessage={formElement.config.errorMessage}
      touched={formElement.config.touched}
      onChange={(event) => changeFormValueHandler(event.target.value, formElement.id)}
    />
  ));
  return (
    <Container className="mt-3">
      <Row>
        <Col xs={12}>
          <Card className="text-center">
            <Card.Header>Forgot password section</Card.Header>
            <Card.Body>
              <Form css={formStyle} onSubmit={submitFormHandler}>
                {form}
                <Button
                  disabled={!formIsValid}
                  className="col col-xs-12 col-sm-4"
                  variant="primary"
                  type="submit"
                >
                    Restore password
                </Button>
                {errorMessage && <p css={errorMessageStyle}>{errorMessage}</p>}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordView;
