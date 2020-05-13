const fetch = require('node-fetch');
const querystring = require('querystring');

const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function makePostRequest(url, headers = defaultHeaders, data) {
  return fetch(url, {
    method: 'POST',
    body: data,
    headers,
  })
    .then((res) => res.json());
}

async function makeGetRequest(url, headers = defaultHeaders) {
  return fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers,
  })
    .then((res) => res.json());
}

module.exports = {
  makePostRequest,
  makeGetRequest,
};
