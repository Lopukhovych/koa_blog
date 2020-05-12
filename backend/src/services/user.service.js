const bcrypt = require('bcryptjs');
const {jwtAuth} = require('src/auth');
const models = require('models');
const {userStatus, userRoles} = require('src/constants');
const {createUser, findOneUser, findAllActiveUsers} = require('src/resources/user.resource');
const {verifyToken} = require('./auth.service');


async function getResponseUserInfo(user) {
  const {
    id, email, roleId, userInfo,
  } = user;
  return {
    id, email, roleId, ...userInfo,
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
    const user = await findOneUser({id});
    if (!user) {
      throw new Error(`No user with id: ${id}`);
    }
    return user;
  } catch (error) {
    console.error('Error getUserById:', id);
    throw new Error('Cannot find user');
  }
}

async function findUserFromJwt(token) {
  try {
    const {id} = await verifyToken(token);
    return getUserById(id);
  } catch (error) {
    console.error('Error_service findUserFromJwt:', error);
    throw new Error('Cannot find user');
  }
}

async function getUserByEmail(email) {
  try {
    const user = await findOneUser({email: email.toString()});
    if (!user) {
      throw new Error('No user with entered email');
    }
    return user;
  } catch (error) {
    console.error('Error_service getUserByEmail:', error);
    throw new Error('Cannot find user');
  }
}

async function validateVacantEmail(email) {
  try {
    const user = await findOneUser({email: email.toString()});
    if (user) {
      throw new Error();
    }
  } catch (error) {
    console.error('Error_service validateVacantEmail:', error);
    throw new Error('User with such email already exist');
  }
}

async function getAllActiveUsers(attributes = []) {
  try {
    return findAllActiveUsers(attributes);
  } catch (error) {
    console.error('Error_service validateVacantEmail:', error);
    throw new Error('Cannot get users information');
  }
}


module.exports = {
  createGoogleUser,
  getResponseUserInfo,
  createLocalUser,
  createCustomUser,
  updateUserPassword,
  getUserById,
  findUserFromJwt,
  getUserByEmail,
  validateVacantEmail,
  getAllActiveUsers,
};
