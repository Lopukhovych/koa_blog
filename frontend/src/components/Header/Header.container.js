/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React, {PureComponent} from 'react';
import {checkValidity, updateObject} from 'src/core/utils';
import HeaderView from './Header.view';

class HeaderContainer extends PureComponent {
    popoverRef = React.createRef();

    constructor(props) {
      super(props);
      this.state = {
        controls: {
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Your email',
            },
            value: '',
            validation: {
              required: true,
              isEmail: true,
            },
            valid: false,
            errorMessage: 'Email should contain only a-z, A-Z, 0-9, ._, and one "@"',
            touched: false,
          },
          password: {
            elementType: 'input',
            elementConfig: {
              type: 'password',
              placeholder: 'Your password',
            },
            value: '',
            validation: {
              required: true,
              // minLength: 6,
            },
            errorMessage: 'Password is required and should contain 6 or more symbols',
            valid: false,
            touched: false,
          },
        },
        formIsValid: false,
      };
    }

    closeLoginPopover = () => {
      this.popoverRef.current.hide();
    };

    changeFormValueHandler = (value, controlName) => {
      const {controls} = this.state;
      const updatedControlName = updateObject(controls[controlName], {
        value,
        valid: checkValidity(value, controls[controlName].validation),
        touched: true,

      });
      const updatedControls = updateObject(controls, {
        [controlName]: updatedControlName,
      });
      let formIsValid = true;

      Object.values(updatedControls).forEach((item) => {
        formIsValid = item.valid && formIsValid;
      });

      this.setState({controls: updatedControls, formIsValid});
    };

    submitFormHandler = (e) => {
      e.preventDefault();
    };

    render() {
      const {controls, formIsValid} = this.state;
      return (
        <HeaderView
          controls={controls}
          formIsValid={formIsValid}
          popoverRef={this.popoverRef}
          title="HeaderView"
          closeLoginPopover={this.closeLoginPopover}
          changeFormValueHandler={this.changeFormValueHandler}
          submitFormHandler={this.submitFormHandler}
        />
      );
    }
}

export default HeaderContainer;
