/** @jsx jsx */
import {css, jsx} from '@emotion/core';

import {Button, Form} from 'react-bootstrap';
import Input from 'src/components/Input';

const inputStyles = css({
  border: '1px solid green',
});

const formStyles = css({
  textAlign: 'left',
  minHeight: '135px',
});

const errorMessageStyles = css({
  margin: '8px 0 4px',
  fontSize: '14px',
  color: 'red',
});

const NewsletterWidgetView = ({
  controls, formIsValid, changeFormValueHandler, submitFormHandler, showLabel, errorMessage,
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
      label={showLabel && formElement.config.elementConfig.placeholder}
      shouldValidate={formElement.config.validation}
      css={inputStyles}
      errorMessage={formElement.config.errorMessage}
      touched={formElement.config.touched}
      onChange={(event) => changeFormValueHandler(event.target.value, formElement.id)}
    />
  ));

  return (
    <Form css={formStyles} onSubmit={submitFormHandler}>
      {form}
      <Button
        disabled={!formIsValid}
        className="col col-xs-12 col-sm-6"
        variant="primary"
        type="submit"
      >
                Subscribe
      </Button>
      {errorMessage && <p css={errorMessageStyles}>{errorMessage}</p>}
    </Form>
  );
};

export default NewsletterWidgetView;
