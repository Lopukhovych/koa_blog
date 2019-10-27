import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {signUpUser as signUpUserAction} from 'src/components/SignUp/redux/actions';
import {
  passwordControl,
  confirmPasswordControl,
  updateFormControlsHandler,
} from 'src/core/formHandler.helper';
import SignUpView from './SignUp.view';

class SignUpContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      controls: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'input',
            placeholder: 'Enter your name',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          errorMessage: 'Enter your name!',
          touched: false,
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Enter your email*',
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
        secretWord: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Enter your secret word*',
          },
          value: '',
          validation: {
            required: true,
            minLength: 4,
            maxLength: 10,
          },
          valid: false,
          errorMessage: 'Should contain from 4 to 10 symbols',
          touched: false,
        },
        [passwordControl]: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Enter your password*',
          },
          value: '',
          validation: {
            required: true,
            minLength: 3,
          },
          valid: false,
          errorMessage: 'Should contain from 6 to 12 symbols',
          touched: false,
        },
        [confirmPasswordControl]: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Repeat your password*',
          },
          value: '',
          validation: {
            required: true,
            minLength: 3,
          },
          valid: false,
          errorMessage: 'Do not match with password field',
          touched: false,
        },
      },
      formIsValid: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.signupError && props.signupError.code === 401) {
      return {errorMessage: 'User is unauthorized! Please try again.'};
    }
    if (props.signUpError) {
      return {errorMessage: 'Authorization error! Check credentials and try later.'};
    }
    return {errorMessage: null};
  }

  changeFormValueHandler = (value, controlName) => {
    const {controls} = this.state;

    this.setState(updateFormControlsHandler(value, controlName, controls));
  };

  submitFormHandler = (e) => {
    e.preventDefault();
    const {controls, formIsValid} = this.state;
    const {signUpUser} = this.props;
    if (formIsValid) {
      const signUpValues = {};
      Object.keys(controls).forEach((key) => {
        if (key !== confirmPasswordControl) {
          signUpValues[key] = controls[key].value;
        }
      });
      signUpUser(signUpValues);
    }
  };

  render() {
    const {controls, formIsValid, errorMessage} = this.state;
    const {showLabel} = this.props;
    return (
      <SignUpView
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

const mapStateToProps = ({signUp}) => ({
  signUpError: signUp.error,
});

const mapDispatchToProps = {
  signUpUser: signUpUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
