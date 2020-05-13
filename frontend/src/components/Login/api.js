import fetch from 'src/utils/api';

export const login = (params) => fetch('/login', {
  method: 'POST',
  body: JSON.stringify(params),
});

export const loginGoogle = (params) => fetch('/auth/google', {
  method: 'POST',
  body: JSON.stringify(params),
});
