import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {checkValidity, updateObject} from 'src/utils/formUtils';
import {restorePassword as restorePasswordAction} from './redux/actions';
import ForgotPasswordView from './ForgotPassword.view';

const passwordControl = 'password';
const confirmPasswordControl = 'confirmPassword';

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

  static getDerivedStateFromProps(props) {
    if (props.restorePasswordError) {
      if (props.restorePasswordError.code === 401) {
        return {errorMessage: 'Email is not correct or secretWord field was empty!'};
      }
      if (props.restorePasswordError.code === 403) {
        return {errorMessage: 'Authorization error! Check credentials and try later.'};
      }
    }
    if (props.restorePasswordError) {
      return {errorMessage: 'Something went wrong! Check credentials or contact us!'};
    }
    return {errorMessage: null};
  }

    checkPasswordConfirmation = (value, controlName) => {
      const {controls} = this.state;
      if (controlName === confirmPasswordControl) {
        const updatedControlName = updateObject(controls[controlName], {
          value,
          valid: checkValidity(value, controls[controlName].validation) && controls[passwordControl].value === value,
          touched: true,
        });
        return updateObject(controls, {[controlName]: updatedControlName});
      }
      if (!controls[confirmPasswordControl].touched) {
        const updatedControlName = updateObject(controls[controlName], {
          value,
          valid: checkValidity(value, controls[controlName].validation),
          touched: true,
        });
        return updateObject(controls, {[controlName]: updatedControlName});
      }
      const updatedPassword = updateObject(controls[controlName], {
        value,
        valid: checkValidity(value, controls[controlName].validation),
        touched: true,
      });

      const updateConfirmationPassword = updateObject(controls[confirmPasswordControl], {
        valid: controls[confirmPasswordControl].value === updatedPassword.value,
        touched: true,
      });

      return updateObject(controls, {
        [controlName]: updatedPassword,
        [confirmPasswordControl]: updateConfirmationPassword,
      });
    };

    changeFormValueHandler = (value, controlName) => {
      const {controls} = this.state;
      let updatedControls;
      if (![confirmPasswordControl, passwordControl].includes(controlName)) {
        const updatedControlName = updateObject(controls[controlName], {
          value,
          valid: checkValidity(value, controls[controlName].validation),
          touched: true,
        });
        updatedControls = updateObject(controls, {
          [controlName]: updatedControlName,
        });
      } else {
        updatedControls = this.checkPasswordConfirmation(value, controlName);
      }

      let formIsValid = true;

      Object.values(updatedControls).forEach((item) => {
        formIsValid = item.valid && formIsValid;
      });

      this.setState({controls: updatedControls, formIsValid});
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
        <div>
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

const mapStateToProps = ({forgotPassword}) => ({
  restorePasswordError: forgotPassword.error,
});

const mapDispatchToProps = {
  restorePassword: restorePasswordAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer);
