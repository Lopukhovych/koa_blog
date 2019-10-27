import {checkValidity, updateObject} from 'src/utils/formUtils';

export const passwordControl = 'password';
export const confirmPasswordControl = 'confirmPassword';


const checkPasswordsEqualHandler = (value, controlName, controls) => {
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

export const updateFormControlsHandler = (value, controlName, controls) => {
  let updatedControls;
  if (!controls[confirmPasswordControl] || ![confirmPasswordControl, passwordControl].includes(controlName)) {
    const updatedControlName = updateObject(controls[controlName], {
      value,
      valid: checkValidity(value, controls[controlName].validation),
      touched: true,
    });
    updatedControls = updateObject(controls, {
      [controlName]: updatedControlName,
    });
  } else {
    updatedControls = checkPasswordsEqualHandler(value, controlName, controls);
  }

  let formIsValid = true;

  Object.values(updatedControls).forEach((item) => {
    formIsValid = item.valid && formIsValid;
  });

  return {controls: updatedControls, formIsValid};
};
