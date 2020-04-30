const bcrypt = require('bcryptjs');
const models = require('models/index');
const {getUserById} = require('src/utils');
const {setUnauthorized, setForbidden} = require('src/utils/auth');
const {getResponseUserInfo, createLocalUser} = require('src/services/user');
const {jwtAuth} = require('src/auth');
const {getUserByEmail} = require('src/services/email');
const {equalPasswordsError} = require('src/services/error');
const {comparePassword} = require('src/services/password');

async function initialize(ctx) {
  try {
    const { token } = ctx.request.body;
    const verified = await jwtAuth.verify(token);
    if (!verified) {
      return setUnauthorized(ctx);
    }
    const decodedData = await jwtAuth.decode(token).payload;
    const user = await getUserById(decodedData.id);
    const userInfo = await getResponseUserInfo(user);
    if (Math.floor((new Date(decodedData.exp * 1000) - new Date()) / (1000 * 3600 * 24)) < 2) {
      const refreshToken = await jwtAuth.sign({ ...userInfo });
      ctx.body = { refreshToken, ...userInfo };
      return null;
    }
    ctx.body = { ...userInfo };
    return null;
  } catch (error) {
    return setUnauthorized(ctx);
  }
}

async function login(ctx) {
  try {
    const { email, password: enteredPass } = ctx.request.body;
    const user = await getUserByEmail(email.toString());

    if (!user || !enteredPass) {
      return setUnauthorized(ctx);
    }

    const {password} = user;
    const equalPassword = await comparePassword(enteredPass, password);


    if (equalPassword) {
      const userInfo = await getResponseUserInfo(user);
      const token = await jwtAuth.sign(userInfo);
      ctx.body = { token, ...userInfo };
      return null;
    }
    return setUnauthorized(ctx);
  } catch (error) {
    return setUnauthorized(ctx);
  }
}

async function signup(ctx, next) {
  const {
    email, password, secretWord, ...userInfo
  } = ctx.request.body;
  if (!userInfo.name || !password || !email) {
    ctx.status = 400;
    ctx.body = {
      error: "expected an object with email and password, but didn't  get these params",
    };
  }
  const user = await getUserByEmail(email);

  if (!user) {
    const newUser = await createLocalUser({
      email, password, secretWord, userInfo,
    });
    if (newUser) {
      return this.login(ctx);
    }
    ctx.status = 200;
    ctx.body = {
      message: 'success',
    };
    next();
  } else {
    ctx.status = 406;
    ctx.body = {
      error: 'User with such email already exist',
    };
  }
}

async function restorePassword(ctx) {
  try {
    const { email, secretWord: enteredSecretWord, password: newPassword } = ctx.request.body;
    const user = await models.Users.findOne({ where: { email } });

    if (!user || !enteredSecretWord) {
      return setUnauthorized(ctx);
    }

    const compared = await bcrypt.compare(enteredSecretWord, user.secretWord);
    const comparedPass = await bcrypt.compare(newPassword, user.password);

    if (compared && !comparedPass) {
      const updatedPassword = await bcrypt.hash(newPassword, 8);
      const updatedUser = await user.update({ password: updatedPassword });

      if (updatedUser) {
        const { password, secredWord, ...userInfoWithoutPassword } = updatedUser.toJSON();
        const token = await jwtAuth.sign({ ...userInfoWithoutPassword });
        const userInfo = await getResponseUserInfo(userInfoWithoutPassword);

        ctx.body = { token, ...userInfo };
      }
    }
    if (comparedPass) {
      return equalPasswordsError(ctx);
    }
    return setForbidden(ctx);
  } catch (error) {
    console.error('restore password error: ', error);
    throw Error(error);
  }
}

module.exports = {
  login, initialize, signup, restorePassword,
};
