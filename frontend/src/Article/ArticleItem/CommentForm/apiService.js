import fetch from 'src/utils/api';

export async function saveComment(params) {
  return fetch('/comments', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
