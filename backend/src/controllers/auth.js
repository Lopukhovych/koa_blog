const bcrypt = require('bcryptjs');
const models = require('models/index');
const {getUserByEmail, getUserById} = require('src/utils');
const {setUnauthorized, setForbidden} = require('src/utils/auth');
const jwtAuth = require('../auth/index');

const { userStatus, userRoles } = require('../constants');

async function getResponseUserInfo(user) {
  return {
    id: user.id,
    email: user.email,
    ...user.userInfo,
  };
}

async function createUser(userData) {
  return models.Users.create(userData);
}

async function equalPasswordsError(ctx) {
  return ctx.throw(
    400,
    'FORBIDDEN',
    {
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
      message: "You can't enter last password",
    },
  );
}

async function initialize(ctx) {
  try {
    const { token } = ctx.request.body;
    const verified = await jwtAuth.verify(token);
    if (!verified) {
      return setUnauthorized(ctx);
    }
    const decodedData = await jwtAuth.decode(token).payload;
    const user = await getUserById(decodedData.id);
    const {
      password,
      secretWord,
      ...userInfoWithoutPassword
    } = user;
    const userInfo = await getResponseUserInfo(userInfoWithoutPassword);
    if (Math.floor((new Date(decodedData.exp * 1000) - new Date()) / (1000 * 3600 * 24)) < 2) {
      const refreshToken = await jwtAuth.sign({ ...userInfoWithoutPassword });
      ctx.body = { refreshToken, ...userInfo };
    }
    ctx.body = { ...userInfo };
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
    const {
      password,
      secretWord,
      ...userInfoWithoutPassword
    } = user;

    const compared = await bcrypt.compare(enteredPass, password);
    if (compared) {
      const token = await jwtAuth.sign({ ...userInfoWithoutPassword });
      const userInfo = await getResponseUserInfo(userInfoWithoutPassword);
      ctx.body = { token, ...userInfo };
    } else {
      return setUnauthorized(ctx);
    }
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
  const emailStr = email.toString();
  const userRole = await models.Role.findOne({ where: { title: userRoles.user }, raw: true });
  const userData = {
    email: emailStr,
    password: await bcrypt.hash(password, 8),
    secretWord: secretWord && await bcrypt.hash(secretWord, 10),
    status: userStatus.active,
    roleId: +userRole.id,
    userInfo,
  };
  const user = await getUserByEmail(emailStr);

  if (!user) {
    const result = await createUser(userData);
    if (result) {
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
  login, initialize, signup, restorePassword, createUser,
};
