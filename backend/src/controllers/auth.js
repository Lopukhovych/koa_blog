const bcrypt = require('bcryptjs');
const {jwtAuth} = require('src/auth');
const {setUnauthorized, setForbidden} = require('src/middleware/exception');
const {
  getResponseUserInfo,
  createLocalUser,
  updateUserPassword,
  getUserById,
} = require('src/services/user');
const {getUserByEmail} = require('src/services/email');
const {equalPasswordsError} = require('src/services/error');
const {comparePassword} = require('src/services/password');
const {checkForRefreshToken} = require('src/services/token');

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
    const refreshToken = checkForRefreshToken(decodedData, userInfo);

    ctx.body = refreshToken ? { refreshToken, ...userInfo } : { ...userInfo };
    return null;
  } catch (error) {
    return setUnauthorized(ctx);
  }
}

async function login(ctx) {
  try {
    const { email, password: enteredPass } = ctx.request.body;

    const user = await getUserByEmail(email);

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
      error: "expected an object with email and password, but didn't get these params",
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

    if (!email || !enteredSecretWord || !newPassword) {
      ctx.status = 400;
      ctx.body = {
        error: 'Expected fields are email, secret word and new password',
      };
      return;
    }

    const user = await getUserByEmail(email);

    if (!user) {
      ctx.status = 400;
      ctx.body = {
        error: 'Can not find user with entered email',
      };
      return;
    }

    const comparedSecretWord = await bcrypt.compare(enteredSecretWord, user.secretWord);
    const comparedPass = await bcrypt.compare(newPassword, user.password);

    if (comparedSecretWord && !comparedPass) {
      const {token, userInfo, error} = await updateUserPassword(user, newPassword);
      ctx.body = error ? { token, ...userInfo } : {error};
      return;
    }
    if (comparedPass) {
      equalPasswordsError(ctx);
      return;
    }
    setForbidden(ctx);
  } catch (error) {
    console.error('restore password error: ', error);
    ctx.body = {
      error,
    };
  }
}

module.exports = {
  login, initialize, signup, restorePassword,
};
