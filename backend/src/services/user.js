const bcrypt = require('bcryptjs');
const {jwtAuth} = require('src/auth');
const models = require('models');
const {userStatus, userRoles} = require('../constants');
const {createUser} = require('../resources/user');


async function getResponseUserInfo(user) {
  return {
    id: user.id,
    email: user.email,
    roleId: user.roleId,
    ...user.userInfo,
  };
}

async function createGoogleUser({
  id, email, verified_email, name, picture, locale,
}, returnSecureToken, refreshToken) {
  const refreshData = {
    service: 'google',
    refreshToken,
  };

  const existingUser = await models.Users
    .findOne({where: {googleId: id}})
    .then(async (record) => (record ? record.update({refreshData}, {raw: true}) : null))
    .catch(async (error) => {
      console.log('error: ', error);
      return null;
    });

  if (existingUser) {
    return existingUser;
  }
  const userRole = await models.Role.findOne({where: {title: userRoles.user}, raw: true});
  const userData = {
    email,
    password: null,
    secretWord: null,
    status: userStatus.active,
    roleId: +userRole.id,
    googleId: id,
    userInfo: {
      name,
      picture,
      returnSecureToken,
    },
    refreshData,
  };
  return createUser(userData);
}

async function createCustomUser({
  email, password, role, age, name, secretWord, status,
}) {
  let enteredRole = null;
  if (role) {
    try {
      enteredRole = await models.Role.findOne({ where: { title: role.toString() }, raw: true });
    } catch (err) {
      console.error(`Role ${role} does not exist`);
    }
  }
  if (!enteredRole) {
    enteredRole = await models.Role.findOne({ where: { title: userRoles.user }, raw: true });
  }

  const userData = {
    email: email.toString(),
    password: await bcrypt.hash(password, 8),
    secretWord: secretWord && await bcrypt.hash(secretWord, 10),
    status: userStatus.pending || userStatus[status],
    roleId: enteredRole.id,
    userInfo: {
      age,
      name,
    },
  };

  return createUser(userData);
}

async function createLocalUser({
  email, password, secretWord, userInfo,
}) {
  const userRole = await models.Role.findOne({ where: { title: userRoles.user }, raw: true });
  const userData = {
    email: email.toString(),
    password: await bcrypt.hash(password, 8),
    secretWord: secretWord && await bcrypt.hash(secretWord, 10),
    status: userStatus.active,
    roleId: +userRole.id,
    userInfo,
  };

  return createUser(userData);
}

async function updateUserPassword(user, newPassword) {
  const updatedPassword = await bcrypt.hash(newPassword, 8);
  const updatedUser = await user.update({ password: updatedPassword });

  if (updatedUser) {
    const { password, secredWord, ...userInfoWithoutPassword } = updatedUser.toJSON();
    const token = await jwtAuth.sign({ ...userInfoWithoutPassword });
    const userInfo = await getResponseUserInfo(userInfoWithoutPassword);

    return { token, ...userInfo };
  }
  return {error: 'Could not update user!'};
}

async function getUserById(id) {
  try {
    return models.Users.findOne({ where: { id }, raw: true });
  } catch (error) {
    console.error('getUserById error: ', error.message);
    return error;
  }
}

module.exports = {
  createGoogleUser,
  getResponseUserInfo,
  createLocalUser,
  createCustomUser,
  updateUserPassword,
  getUserById,
};
