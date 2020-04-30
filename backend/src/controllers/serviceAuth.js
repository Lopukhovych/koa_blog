const {google: {getGoogleAccessData, getGoogleUserData}, jwtAuth} = require('src/auth');
const {createGoogleUser, getResponseUserInfo} = require('src/services/user');

async function googleLogin(ctx) {
  const {code, returnSecureToken} = ctx.request.body;
  if (!code) {
    ctx.body = { error: 'something went wrong, please repeat an operation or login with email and password' };
    return;
  }
  const tokenData = await getGoogleAccessData(code);
  if (tokenData.error) {
    ctx.response.status = 400;
    ctx.body = { error: 'something went wrong, please repeat an operation' };
    return;
    // something went wrong, ask user repeat auth operation
  }
  const {
    access_token, refresh_token, token_type,
  } = tokenData;

  const userData = await getGoogleUserData({token_type, access_token});

  if (userData.error) {
    ctx.response.status = 400;
    ctx.body = { error: 'Can\'t get google user data, please repeat a login operation'};
    return;
    // something went wrong, ask user repeat auth operation
  }

  const user = await createGoogleUser(userData, returnSecureToken, refresh_token);
  const userInfo = await getResponseUserInfo(user);

  const token = await jwtAuth.sign(userInfo);

  ctx.response.status = 200;
  ctx.body = { token, ...userInfo };
}


module.exports = {
  googleLogin,
};
