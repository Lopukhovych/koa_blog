import fetch from 'src/utils/api';


export default async function loadPosts() {
  return fetch('/comments');
}
