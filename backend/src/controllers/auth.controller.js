const {setUnauthorized, setBadRequest} = require('src/middleware/exception.middleware');
const {
  getResponseUserInfo,
  createLocalUser,
  updateUserPassword,
  getUserById,
  getUserByEmail,
  validateVacantEmail,
} = require('src/services/user.service');
const {verifyToken, validateSignUpData} = require('src/services/auth.service');
const {comparePassword, validateRestorePassData, validatEnteredPassword} = require('src/services/password.service');
const {checkForRefreshToken, signToken} = require('src/services/token.service');

async function initialize(ctx) {
  try {
    const { token } = ctx.request.body;
    const {id: userId, exp: expDate} = await verifyToken(token);
    const user = await getUserById(userId);
    const userInfo = await getResponseUserInfo(user);
    const refreshToken = await checkForRefreshToken(expDate, userInfo);

    ctx.body = refreshToken ? { refreshToken, ...userInfo } : { ...userInfo };
    return null;
  } catch (error) {
    console.error('Error_controller initialize: ', error.message);
    return setUnauthorized(ctx);
  }
}

async function login(ctx) {
  try {
    const { email, password: enteredPass } = ctx.request.body;
    const user = await getUserByEmail(email);

    await comparePassword(enteredPass, user);

    const userInfo = await getResponseUserInfo(user);
    const token = await signToken(userInfo);
    ctx.status = 200;
    ctx.body = { token, ...userInfo };
  } catch (error) {
    console.error('Error_controller login: ', error.message);
    return setUnauthorized(ctx);
  }
}

async function signup(ctx) {
  try {
    const {
      email, password, secretWord, ...userInfo
    } = ctx.request.body;

    await validateSignUpData(email, password, userInfo);
    await validateVacantEmail(email);

    await createLocalUser({
      email, password, secretWord, userInfo,
    });

    return login(ctx);
  } catch (error) {
    console.error('Error_controller signup: ', error.message);
    await setBadRequest(ctx, error);
  }
}

async function restorePassword(ctx) {
  try {
    const { email, secretWord: enteredSecretWord, password: newPassword } = ctx.request.body;

    await validateRestorePassData(email, enteredSecretWord, newPassword);

    const user = await getUserByEmail(email);

    await validatEnteredPassword(user, newPassword, enteredSecretWord);

    const {token, userInfo} = await updateUserPassword(user, newPassword);
    ctx.status = 200;
    ctx.body = { token, ...userInfo };
  } catch (error) {
    console.error('Error_controller restorePassword: ', error.message);
    await setBadRequest(ctx, error);
  }
}

module.exports = {
  login, initialize, signup, restorePassword,
};
