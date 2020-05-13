const querystring = require('querystring');
const {GOOGLE_GOOGLE_ID, GOOGLE_CLIENT_SECRET, REACT_APP_URL} = require('config');
const {makePostRequest, makeGetRequest} = require('src/utils/fetch.util');

async function getGoogleAccessData(code) {
  try {
    if (!code) {
      throw new Error();
    }

    const requestData = querystring.stringify({
      code,
      client_id: GOOGLE_GOOGLE_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REACT_APP_URL,
    });

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': requestData.length,
    };

    return makePostRequest('https://oauth2.googleapis.com/token', headers, requestData);
  } catch (error) {
    console.error('Error_service getGoogleAccessData:', error);
    throw new Error('Invalid login data');
  }
}

async function getGoogleUserData({token_type, access_token}) {
  try {
    const token = `${token_type} ${access_token}`;
    const headers = {
      Authorization: token,
    };
    return makeGetRequest('https://www.googleapis.com/oauth2/v2/userinfo', headers);
  } catch (error) {
    console.error('Error_service getGoogleUserData:', error);
    throw new Error('Invalid google token');
  }
}

module.exports = {
  getGoogleAccessData, getGoogleUserData,
};
