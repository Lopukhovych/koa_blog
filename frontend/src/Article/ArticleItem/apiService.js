import fetch from 'src/utils/api';

export async function loadArticle(id) {
  console.log('params: ', id);
  return fetch(`/post/${id}`);
}
