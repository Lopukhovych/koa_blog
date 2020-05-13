/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import {Form, Button} from 'react-bootstrap';
import Input from 'src/components/Input';
import { GoogleLogin } from 'react-google-login';

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

const googleLoginButtonStyle = css({
  margin: '4px 0 10px',
  width: '100%',
});


const LoginView = ({
  controls,
  formIsValid,
  changeFormValueHandler,
  submitFormHandler,
  showLabel,
  errorMessage,
  redirectPath,
  responseGoogle,
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
    <div>
      <GoogleLogin
        css={googleLoginButtonStyle}
        clientId="306944745239-bmnum18doj837as22viass5005u0iuh7.apps.googleusercontent.com"
        theme="dark"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={(error) => {
          console.log('error: ', error);
        }}
        cookiePolicy="single_host_origin"
        accessType="offline"
        responseType="code"
        redirectUri={redirectPath}
        prompt="consent"
      />
      <Form css={formStyle} onSubmit={submitFormHandler}>
        {form}
        <Button
          disabled={!formIsValid}
          className="col col-xs-12 col-sm-6"
          variant="primary"
          type="submit"
        >
          Log In
        </Button>
        {errorMessage && <p css={errorMessageStyle}>{errorMessage}</p>}
      </Form>
    </div>
  );
};

export default LoginView;
