import fetch from 'src/utils/api';

export const loadContactUs = () => fetch('/contact-us');

export const leaveMessage = (params) => fetch('/contact-us', {
  method: 'POST',
  body: JSON.stringify(params),
});
