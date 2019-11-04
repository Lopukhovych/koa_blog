import React, {PureComponent} from 'react';
import {updateFormControlsHandler} from 'src/core/formHandler.helper';
import {newsSubscribe} from './api';
import NewsletterWidgetView from './NewsletterWidget.view';

class NewsletterWidgetContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Enter your email',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          errorMessage: 'Should contain only a-z, A-Z, 0-9, ._, and one "@"',
          touched: false,
        },
      },
    };
  }

  changeFormValueHandler = (value, controlName) => {
    const {controls} = this.state;

    this.setState(updateFormControlsHandler(value, controlName, controls));
  };

  submitFormHandler = (e) => {
    e.preventDefault();
    const {controls, formIsValid} = this.state;
    if (formIsValid) {
      const formValues = {};
      Object.keys(controls).forEach((key) => {
        formValues[key] = controls[key].value;
      });
      newsSubscribe(formValues)
        .then((res) => {
          if (res instanceof Error) {
            console.log('newsSubscribe error: ', res);
            // TODO show error notification
            return;
          }
          console.log('successfully subscribed!');
        });
    }
  };

  render() {
    const {controls, formIsValid, errorMessage} = this.state;
    const {showLabel} = this.props;
    const {infoTitle} = this.props;
    return (
      <NewsletterWidgetView
        infoTitle={infoTitle}
        controls={controls}
        formIsValid={formIsValid}
        showLabel={showLabel}
        changeFormValueHandler={this.changeFormValueHandler}
        submitFormHandler={this.submitFormHandler}
        errorMessage={errorMessage}
      />
    );
  }
}

export default NewsletterWidgetContainer;
