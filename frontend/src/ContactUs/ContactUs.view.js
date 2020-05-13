/** @jsx jsx */

import {css, jsx} from '@emotion/core';
import {
  Button, Container, Form, Row,
} from 'react-bootstrap';
import Input from '../components/Input';

const wrapperStyles = css({
  padding: '2rem 3rem',
  '& section': {
    padding: '8px',
  },
  '& h2, & h3': {
    textAlign: 'left',
    letterSpacing: '0.3px',
    paddingLeft: '2rem',
    color: '#157be8',
    fontSize: '44px',
    lineHeight: '56px',
  },
  '& h3': {
    fontSize: '34px',
    lineHeight: '40px',
    paddingLeft: '0',
  },
});

const infoItemStyles = css({
  textTransform: 'capitalize',
});

const formStyle = css({
  textAlign: 'left',
  '& textarea': {
    height: '200px',
    resize: 'none',
  },
});

const inputStyle = css({
  border: '1px solid green',
  '&:hover, &:focus, &:active': {
    outline: 'none',
  },
});

const errorMessageStyles = css({
  margin: '8px 0 4px',
  fontSize: '14px',
  color: 'red',
});

const successMessageStyles = css({
  color: '#007bff',
  fontSize: '20px',
  marginTop: '12px',
});

const transformContactInfo = (info) => Object.keys(info).map((item) => (
  <p key={item}>
    <span css={infoItemStyles}>{item}</span>
    :
    {' '}
    {info[item]}
  </p>
));

const ContactUsView = ({
  feedBack,
  showLabel,
  contactInfo,
  controls,
  formIsValid,
  errorMessage,
  changeFormValueHandler,
  submitFormHandler,
  sendMessagePending,
  sendMessageSuccess,
  sendMessageFailure,
}) => {
  const transformedContactInfo = transformContactInfo(contactInfo);
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
    <Container fluid css={wrapperStyles}>
      <Row>
        <h2>Contact us</h2>
      </Row>
      <section className="col-md-12">
        <p>{feedBack}</p>
      </section>
      <section className="col-xs-12">
        <h3>Contact information</h3>
        {transformedContactInfo}
      </section>
      <section className="col-xs-12">
        <h3>Leave a message</h3>
        <Form css={formStyle} className="offset-sm-2 col-sm-8" onSubmit={submitFormHandler}>
          {form}
          <Button
            disabled={!formIsValid || sendMessagePending}
            className="col col-xs-6 col-sm-3"
            variant="primary"
            type="submit"
          >
         SendMessage
          </Button>
          {errorMessage && <p css={errorMessageStyles}>{errorMessage}</p>}
          {sendMessageFailure
          && <p css={errorMessageStyles}>Message can not be sent, please try later or reload page</p>}
          {sendMessageSuccess && <p css={successMessageStyles}>Your message was successfully sent</p>}
        </Form>
      </section>
    </Container>
  );
};

export default ContactUsView;
