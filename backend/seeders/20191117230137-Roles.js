const {userRoles} = require('../src/constants');

module.exports = {
  up: async (queryInterface) => {
    const rolesList = Object.values(userRoles).map((role) => ({
      title: role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Roles',
      [
        ...rolesList,
      ]);
  },
  down: (queryInterface) => queryInterface.bulkDelete('Roles', null, {}),
};
