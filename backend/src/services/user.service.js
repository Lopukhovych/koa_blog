const {userStatus, userRoles} = require('src/constants');
const {
  createUser, findOneUser, findAllActiveUsers, findAllUsers,
} = require('src/resources/user.resource');
const {findModeratorPermissionIds} = require('src/resources/roles.resource');
const {verifyToken} = require('./auth.service');
const {hashPassword} = require('./password.service');
const {hashSecretWord} = require('./secredWord.service');
const {getRoleByTitle} = require('./role.service');

async function getResponseUserInfo(user) {
  try {
    const {
      id, email, roleId, userInfo,
    } = user;
    return {
      id, email, roleId, ...userInfo,
    };
  } catch (error) {
    console.error('Error_service getResponseUserInfo:', error);
    throw new Error('Cannot get user information');
  }
}

async function updateUser(user, newData) {
  try {
    await user.update(newData);
  } catch (error) {
    console.error('Error_service updateUser:', error);
    throw new Error('Cannot update user');
  }
}

async function deleteUser(user) {
  try {
    await user.destroy();
  } catch (error) {
    console.error('Error_service deleteUser:', error.message);
    throw new Error('Cannot delete user');
  }
}

async function createGoogleUser({
  id, email, verified_email, name, picture, locale,
}, returnSecureToken, refreshToken) {
  try {
    const refreshData = {
      service: 'google',
      refreshToken,
    };

    const existingUser = await findOneUser({googleId: id});

    if (existingUser) {
      await updateUser(existingUser, {refreshData});
      return existingUser;
    }

    const {id: roleId} = await getRoleByTitle(userRoles.user);

    const userData = {
      email,
      password: null,
      secretWord: null,
      status: userStatus.active,
      roleId,
      googleId: id,
      userInfo: {
        name,
        picture,
        returnSecureToken,
      },
      refreshData,
    };
    return createUser(userData);
  } catch (error) {
    console.error('Error_service createGoogleUser:', error);
    throw new Error('Cannot get user information');
  }
}

async function createCustomUser({
  email, password, role, age, name, secretWord, status,
}) {
  try {
    const {id: roleId} = role ? await getRoleByTitle(role) : await getRoleByTitle(userRoles.user);
    const newPassword = await hashPassword(password);
    const newSecretWord = secretWord && await hashSecretWord(password);
    const newUserStatus = userStatus[status] || userStatus.pending;

    const userData = {
      email,
      password: newPassword,
      secretWord: newSecretWord,
      status: newUserStatus,
      roleId,
      userInfo: {age, name},
    };

    return createUser(userData);
  } catch (error) {
    console.error('Error_service createCustomUser:', error);
    throw new Error('Cannot create user');
  }
}

async function updateCustomUser({
  email, role, status, password, secretWord, age, name,
}, user) {
  try {
    const {id: roleId} = role ? await getRoleByTitle(role) : await getRoleByTitle(userRoles.user);
    const newPassword = password && await hashPassword(password);
    const newSecretWord = secretWord && await hashSecretWord(password);
    const newUserStatus = status && (userStatus[status] || userStatus.pending);
    const {userInfo} = user;
    const newUserInfo = {...userInfo};

    ([age, name]).forEach((item) => {
      if (item) {
        newUserInfo[item] = item;
      }
    });

    const userData = {
      email,
      password: newPassword,
      secretWord: newSecretWord,
      status: newUserStatus,
      roleId,
      userInfo: newUserInfo,
    };

    await user.update(userData);
  } catch (error) {
    console.error('Error_service updateCustomUser:', error);
    throw new Error('Cannot update user');
  }
}

async function createLocalUser({
  email, password, secretWord, name,
}) {
  try {
    const {id: roleId} = await getRoleByTitle(userRoles.user);
    const newPassword = await hashPassword(password);
    const newSecretWord = secretWord && await hashSecretWord(password);
    const userData = {
      email,
      password: newPassword,
      secretWord: newSecretWord,
      status: userStatus.active,
      roleId,
      userInfo: {
        name,
      },
    };

    return createUser(userData);
  } catch (error) {
    console.error('Error_service createLocalUser:', error);
    throw new Error('Cannot create user');
  }
}

async function updateUserPassword(user, newPassword) {
  try {
    const updatedPassword = await hashPassword(newPassword);
    await updateUser(user, { password: updatedPassword });
  } catch (error) {
    console.error('Error_service updateUserPassword:', error);
    throw new Error('Cannot create user');
  }
}

async function getUserById(id) {
  try {
    const user = await findOneUser({id});
    if (!user) {
      throw new Error(`No user with id: ${id}`);
    }
    return user;
  } catch (error) {
    console.error('Error_service getUserById:', error);
    throw new Error('Cannot find user');
  }
}

async function checkGetUserPermissions(user, requestedUser) {
  try {
    const {id, roleId} = user;
    const {id: requestedUserId} = requestedUser;
    const moderatorIds = await findModeratorPermissionIds();
    if (moderatorIds.includes(roleId) || id === requestedUserId) {
      return;
    }
    throw new Error(`User with id ${id} cannot not get this user`);
  } catch (error) {
    console.error('Error_service checkGetUserPermissions:', error.message);
    throw new Error('Invalid permissions');
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
    const user = await findOneUser({email});
    if (!user) {
      throw new Error('No user with entered email');
    }
    return user;
  } catch (error) {
    console.error('Error_service getUserByEmail:', error);
    throw new Error('Cannot find user');
  }
}

async function checkUserExistByEmail(email) {
  try {
    const user = await findOneUser({email});
    if (user) {
      throw new Error();
    }
  } catch (error) {
    console.error('Error_service checkUserExistByEmail:', error);
    throw new Error('Email already is used');
  }
}

async function getAllActiveUsers(attributes) {
  try {
    return findAllActiveUsers(attributes);
  } catch (error) {
    console.error('Error_service getAllActiveUsers:', error);
    throw new Error('Cannot get users information');
  }
}

async function getAllUsers(attributes) {
  try {
    return findAllUsers(attributes);
  } catch (error) {
    console.error('Error_service getUserList:', error);
    throw new Error('Cannot get users');
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
  getAllActiveUsers,
  checkGetUserPermissions,
  getAllUsers,
  checkUserExistByEmail,
  updateCustomUser,
  deleteUser,
};
