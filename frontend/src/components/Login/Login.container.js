import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {passwordControl, updateFormControlsHandler} from 'src/core/formHandler.helper';
import LoginView from './Login.view';
import {loginUser as loginUserAction} from './redux/actions';


class LoginContainer extends PureComponent {
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
        [passwordControl]: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Enter your password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 3,
          },
          valid: false,
          errorMessage: 'Should contain 6 or more symbols',
          touched: false,
        },
      },
      formIsValid: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.loginError && props.loginError.code === 401) {
      return {errorMessage: 'User is unauthorized! Please try again.'};
    } if (props.loginError) {
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
      const {loginUser} = this.props;
      if (formIsValid) {
        const loginValues = {};
        Object.keys(controls).forEach((key) => {
          loginValues[key] = controls[key].value;
        });
        loginUser(loginValues);
      }
    };


    render() {
      const {controls, formIsValid, errorMessage} = this.state;
      const {showLabel} = this.props;
      return (
        <LoginView
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

const mapStateToProps = ({login}) => ({
  loginError: login.error,
});

const mapDispatchToProps = {
  loginUser: loginUserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
