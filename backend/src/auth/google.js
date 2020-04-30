const fetch = require('node-fetch');
const querystring = require('querystring');
const {GOOGLE_GOOGLE_ID, GOOGLE_CLIENT_SECRET, REACT_APP_URL} = require('../../config');

async function getGoogleAccessData(code) {
  try {
    const requestData = querystring.stringify({
      code,
      client_id: GOOGLE_GOOGLE_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REACT_APP_URL,
    });

    return fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      body: requestData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': requestData.length,
      },
    })
      .then((res) => res.json());
  } catch (error) {
    console.log('getGoogleAccessData_error: ', error);
    return {
      error,
    };
  }
}

async function getGoogleUserData({token_type, access_token}) {
  try {
    const token = `${token_type} ${access_token}`;
    return fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json());
  } catch (error) {
    console.log(' error: ', error);
    return {
      error,
    };
  }
}

module.exports = {
  getGoogleAccessData, getGoogleUserData,
};
