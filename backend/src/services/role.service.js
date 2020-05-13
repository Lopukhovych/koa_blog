const {findRoleByTitle} = require('src/resources/roles.resource');
const {userRoles} = require('src/constants');

async function getRoleByTitle(role) {
  try {
    if (role === userRoles.admin) {
      throw new Error('Role is forbidden');
    }
    return findRoleByTitle(userRoles.user);
  } catch (error) {
    console.error('Error_service getRoleByTitle:', error);
    throw new Error('Cannot get role');
  }
}

module.exports = {
  getRoleByTitle,
};
