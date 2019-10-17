import {callApi} from 'src/utils/fetchApi';
import fetch from 'src/utils/api';


export default async function loadPosts() {
  return fetch('/comments');
  // return callApi('/comments', {}, 'Get');
}
