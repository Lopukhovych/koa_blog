const { permissions} = require('./constants');
const {userRoles} = require('../src/constants');

module.exports = {
  up: async (queryInterface) => {
    const permissionsList = await queryInterface.sequelize
      .query('SELECT id, title from "Permissions"', {raw: true })
      .then((data) => data[0]);

    const rolesList = await queryInterface.sequelize
      .query('SELECT id, title from "Roles"', { raw: true })
      .then((data) => data[0]);

    const userPermList = [permissions.readArticle, permissions.commentArticle];
    const authorPermList = [...userPermList, permissions.createArticle, permissions.deleteArticle];
    const moderatorList = [...authorPermList, permissions.approveArticle];
    const adminList = [...Object.values(permissions)];

    const rolesMap = new Map();
    rolesMap.set(userRoles.user, userPermList);
    rolesMap.set(userRoles.author, authorPermList);
    rolesMap.set(userRoles.moderator, moderatorList);
    rolesMap.set(userRoles.admin, adminList);


    const rolePermissionsList = [];
    rolesList.forEach((role) => {
      permissionsList.forEach((permission) => {
        if (rolesMap.get(role.title).includes(permission.title)) {
          rolePermissionsList.push(
            {
              roleId: role.id,
              permissionId: permission.id,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          );
        }
      });
    });
    await queryInterface.bulkInsert('RolePermissions', [
      ...rolePermissionsList,
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('RolePermissions', null, {});
  },
};
