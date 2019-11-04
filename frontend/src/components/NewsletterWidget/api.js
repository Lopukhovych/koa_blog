import fetch from 'src/utils/api';


export const newsSubscribe = (params) => fetch('/subscribe', {
  method: 'POST',
  body: JSON.stringify(params),
});
