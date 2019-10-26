/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import {Form, Button} from 'react-bootstrap';
import Input from 'src/components/Input';

const inputStyle = css({
  border: '1px solid green',
});

const formStyle = css({
  textAlign: 'left',
});

const errorMessageStyle = css({
  margin: '8px 0 4px',
  fontSize: '14px',
  color: 'red',
});


const SignUpView = ({
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
      css={inputStyle}
      errorMessage={formElement.config.errorMessage}
      touched={formElement.config.touched}
      onChange={(event) => changeFormValueHandler(event.target.value, formElement.id)}
    />
  ));
  return (
    <Form css={formStyle} onSubmit={submitFormHandler}>
      {form}
      <Button
        disabled={!formIsValid}
        className="col col-xs-12 col-sm-6"
        variant="primary"
        type="submit"
      >
                Sign Up
      </Button>
      {errorMessage && <p css={errorMessageStyle}>{errorMessage}</p>}
    </Form>
  );
};

export default SignUpView;
