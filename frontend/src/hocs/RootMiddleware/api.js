import fetch from 'src/utils/api';

export const initialize = (params) => fetch('/initialize', {
  method: 'POST',
  body: JSON.stringify(params),
});
