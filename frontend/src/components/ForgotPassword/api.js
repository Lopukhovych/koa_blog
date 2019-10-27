import fetch from 'src/utils/api';

export const restorePasswordRequest = (params) => fetch('/restore_password', {
  method: 'POST',
  body: JSON.stringify(params),
});
