import fetch from 'src/utils/api';


export const signup = (params) => fetch('/signup', {
  method: 'POST',
  body: JSON.stringify(params),
});
