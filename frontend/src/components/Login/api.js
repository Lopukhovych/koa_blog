import fetch from 'src/utils/api';


export const login = (params) => fetch('/login', {
  method: 'POST',
  body: JSON.stringify(params),
});
