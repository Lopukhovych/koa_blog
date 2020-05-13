const {getGoogleAccessData, getGoogleUserData} = require('src/services/google.service');
const {createGoogleUser, getResponseUserInfo} = require('src/services/user.service');
const {setBadRequest} = require('src/middleware/exception.middleware');
const {signToken} = require('src/services/token.service');

async function googleLogin(ctx) {
  try {
    const {code, returnSecureToken} = ctx.request.body;

    const {
      access_token, refresh_token, token_type,
    } = await getGoogleAccessData(code);

    const userData = await getGoogleUserData({token_type, access_token});
    const user = await createGoogleUser(userData, returnSecureToken, refresh_token);
    const userInfo = await getResponseUserInfo(user);

    const token = await signToken(userInfo);

    ctx.response.status = 200;
    ctx.body = { token, ...userInfo };
  } catch (error) {
    console.error('Error_controller googleLogin: ', error.message);
    await setBadRequest(ctx, error);
  }
}


module.exports = {
  googleLogin,
};
