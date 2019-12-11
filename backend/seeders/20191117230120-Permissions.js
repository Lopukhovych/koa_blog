const {permissions} = require('./constants');

module.exports = {
  up: async (queryInterface) => {
    const permissionList = Object.values(permissions).map((permission) => ({
      title: permission,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Permissions', [
      ...permissionList,
    ]);
  },
  down: (queryInterface) => queryInterface.bulkDelete('Permissions', null),
};
