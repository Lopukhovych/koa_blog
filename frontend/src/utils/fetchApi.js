const initialUrl = 'http://localhost:3200';

const apiHeaders = {
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: localStorage.getItem('jwt_token'),
};
const methodList = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
};

function buildGetRequest(url, params, headers) {
  return window.fetch(url, {
    method: methodList.get,
    params,
    headers,
  });
}
// function buildPostRequest(url, params, headers) {
//   return window.fetch(url, {
//     method: methodList.get,
//     headers,
//   });
// }
// function buildPutRequest(url, params, headers) {
//   return window.fetch(url, {
//     method: methodList.get,
//     headers,
//   });
// }
// function buildDeleteRequest(url, params, headers) {
//   return window.fetch(url, {
//     method: methodList.get,
//     headers,
//   });
// }


const parseResponse = (result) => {
  if (result instanceof Error) {
    console.log('error_result: ', result);
    throw Error(result);
  }
  console.log('result: ', result.json());
  return result.json();
};


export async function callApi(path, params, method, meta, headers = apiHeaders, origin = initialUrl) {
  // console.log('localStorage.getItem: ', localStorage.getItem('jwt_token'));
  // const endpoint = `${origin}${path}`;
  // const response = cache1(endpoint, headers);
  // const res1 = localStorage.get('qwert') || await drugaya_huinia();
  // const response = await cache(endpoint, headers) || await buildGetRequest(endpoint, headers);
  //
  // const rws =

  // return parseResponse(response);
  // .then(parseResponse)
  //     .then(res => );
  // return new Promise((resolve, reject) => {
  // try {
  //   switch (method.toUpperCase()) {
  //     case methodList.get:
  //       result = await buildGetRequest(endpoint, headers);
  //       console.log('methodList.get: ');
  //       break;
  //     case methodList.post:
  //       result = await buildPostRequest(endpoint, params, headers);
  //       console.log('methodList.post');
  //       break;
  //     case methodList.put:
  //       result = await buildPutRequest(endpoint, params, headers);
  //       break;
  //     case methodList.delete:
  //       result = await buildDeleteRequest(endpoint, headers);
  //       break;
  //     default:
  //       break;
  //       // reject();
  //   }
  //   return result.json();
  // } catch (e) {
  //   console.log('e: ', e);
  // }
  // ).then((result) => {
  //   if (result instanceof Error) {
  //     console.log('error_result: ', result);
  //     throw Error(result);
  //   }
  //   console.log('result: ', result.json());
  //   return result.json();
  // }, (rejected) => { console.log('rejected: ', rejected); });
}


export async function callApi1() { console.log('1: ', 1); }
