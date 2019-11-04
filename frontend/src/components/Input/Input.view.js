/** @jsx jsx */
import {css, jsx} from '@emotion/core';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  Form, FormControl,
} from 'react-bootstrap';

const invalidControl = css({
  border: '1px solid red',
});

const errorTextStyle = css({
  color: 'red !important',
});

const InputView = ({
  label, text, onChange, className, invalid, touched, shouldValidate, elementConfig, errorMessage, ...props
}) => {
  let inputElement = null;
  let inputCss = {};

  if (invalid && shouldValidate && touched) {
    inputCss = css(inputCss, invalidControl);
  }

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <>
          <FormControl
            onChange={onChange}
            css={{...className, ...inputCss}}
            {...elementConfig}
          />
          {invalid && touched && (
            <Form.Text css={errorTextStyle} className="text-muted">
              {errorMessage}
            </Form.Text>
          )}
        </>
      );
      break;
    case 'textarea':
      inputElement = (
        <Form.Control
          onChange={onChange}
          as="textarea"
          css={{...className, ...inputCss}}
          {...elementConfig}
        />
      );
      break;
    case 'select':

      inputElement = (
        <Form.Control
          onChange={onChange}
          css={{...className, ...inputCss}}
          {...elementConfig}
          as="select"
        >
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </Form.Control>
      );
      break;
    default:
      inputElement = (
        <FormControl
          onChange={onChange}
          css={{...className, ...inputCss}}
          {...elementConfig}
        />
      );
  }
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      {inputElement}
      {text && <Form.Text className={text.className}>{text.value}</Form.Text>}
    </Form.Group>
  );
};

export default InputView;
