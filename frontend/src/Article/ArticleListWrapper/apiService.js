import fetch from 'src/utils/api';


export async function loadArticleList(params) {
  return fetch('/post', params);
}
