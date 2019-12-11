import fetch from 'src/utils/api';

export async function loadArticle(id) {
  return fetch(`/post/${id}`);
}
