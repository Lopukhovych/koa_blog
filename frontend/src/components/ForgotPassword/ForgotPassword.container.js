import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {
  passwordControl,
  confirmPasswordControl,
  updateFormControlsHandler,
} from 'src/core/formHandler.helper';
import {restorePassword as restorePasswordAction} from './redux/actions';
import ForgotPasswordView from './ForgotPassword.view';

class ForgotPasswordContainer extends PureComponent {
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
            placeholder: 'Enter your new password*',
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
            placeholder: 'Repeat your new password*',
          },
          value: '',
          validation: {
            required: true,
            minLength: 3,
          },
          errorMessage: "Do not match with 'new password' field",
          valid: false,
          touched: false,
        },
      },
      formIsValid: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromProps(nextProp) {
    const {restorePasswordError} = nextProp;
    if (restorePasswordError) {
      if (restorePasswordError.code === 401) {
        return {errorMessage: 'Email is not correct or secretWord field was empty!'};
      }
      if (restorePasswordError.code === 403) {
        return {errorMessage: 'Authorization error! Check credentials and try later.'};
      }
    }
    if (restorePasswordError) {
      return {errorMessage: 'Something went wrong! Check credentials or contact us!'};
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
    const {restorePassword} = this.props;
    if (formIsValid) {
      const formValues = {};
      Object.keys(controls).forEach((key) => {
        if (key !== confirmPasswordControl) {
          formValues[key] = controls[key].value;
        }
      });
      restorePassword(formValues);
    }
  };

  render() {
    const {controls, formIsValid, errorMessage} = this.state;
    return (
      <div className="col-xs-12 col-sm-6">
        <ForgotPasswordView
          controls={controls}
          formIsValid={formIsValid}
          changeFormValueHandler={this.changeFormValueHandler}
          submitFormHandler={this.submitFormHandler}
          errorMessage={errorMessage}
        />
      </div>
    );
  }
}

const mapStateToProps = ({forgotPassword, userData}) => ({
  restorePasswordError: forgotPassword.error,
  userData: userData.userData,
});

const mapDispatchToProps = {
  restorePassword: restorePasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
