import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {checkValidity, updateObject} from 'src/utils/formUtils';

import {signUpUser as signUpUserAction} from 'src/components/SignUp/redux/actions';
import SignUpView from './SignUp.view';

const passwordControl = 'password';
const confirmPasswordControl = 'confirmPassword';


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
          errorMessage: 'Should contain only a-z, A-Z, 0-9, ._, and one "@"',
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
          errorMessage: 'Do not match with password',
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
    if (props.signupError) {
      return {errorMessage: 'Authorization error! Check credentials and try later.'};
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
    const updatedControls = updateObject(controls, {
      [controlName]: updatedPassword,
      [confirmPasswordControl]: updateConfirmationPassword,
    });
    return updatedControls;
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
