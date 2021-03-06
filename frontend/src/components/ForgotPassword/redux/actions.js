export const RESTORE_PASSWORD = 'RESTORE_PASSWORD';
export const RESTORE_PASSWORD_PENGING = 'RESTORE_PASSWORD_PENGING';
export const RESTORE_PASSWORD_SUCCESS = 'RESTORE_PASSWORD_SUCCESS';
export const RESTORE_PASSWORD_FAILED = 'RESTORE_PASSWORD_FAILED';

export const restorePassword = (userData) => ({
  type: RESTORE_PASSWORD,
  ...userData,
});

export const restorePasswordStart = () => ({
  type: RESTORE_PASSWORD_PENGING,
});

export const restorePasswordSuccess = () => ({
  type: RESTORE_PASSWORD_SUCCESS,
});

export const restorePasswordFail = (error) => ({
  type: RESTORE_PASSWORD_FAILED,
  payload: error,
});
