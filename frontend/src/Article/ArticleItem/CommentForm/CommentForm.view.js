/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import {Button, Form} from 'react-bootstrap';
import Input from 'src/components/Input';


const commentFromStyles = css({
  padding: '4px 8px',
  h4: {
    margin: '4px 8px 8px',
  },
});

const inputStyle = css({});

const errorMessageStyle = css({
  margin: '8px 4px',
  color: 'red',
  fontSize: '13px',
});

const CommentFormView = ({
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
      css={inputStyle}
      errorMessage={formElement.config.errorMessage}
      touched={formElement.config.touched}
      onChange={(event) => changeFormValueHandler(event.target.value, formElement.id)}
    />
  ));
  return (
    <Form css={commentFromStyles} onSubmit={submitFormHandler}>
      <h4>Leave a comment</h4>
      {form}
      <Button
        disabled={!formIsValid}
        className="col col-xs-12 col-sm-3"
        variant="primary"
        type="submit"
      >
        Leave a comment
      </Button>
      {errorMessage && <p css={errorMessageStyle}>{errorMessage}</p>}
    </Form>
  );
};

export default CommentFormView;
