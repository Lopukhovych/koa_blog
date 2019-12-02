const bcrypt = require('bcryptjs');
const {userRoles} = require('../src/constants');
const {getRoleIdByTitle} = require('./utils');

module.exports = {
  up: async (queryInterface) => {
    const roles = await queryInterface.sequelize
      .query('SELECT id, title FROM "Roles"', {raw: true});

    const userList = [
      {
        email: 'volod@gmail.com',
        roleId: getRoleIdByTitle(roles[0], userRoles.admin),
        status: 'active',
        password: await bcrypt.hash('pass123', 8),
        secretWord: await bcrypt.hash('qwerty', 10),
        userInfo: JSON.stringify({age: 20, name: 'Volod'}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'john@example.com',
        roleId: getRoleIdByTitle(roles[0], userRoles.user),
        status: 'pending',
        password: await bcrypt.hash('pass123', 8),
        secretWord: await bcrypt.hash('qwerty', 10),
        userInfo: JSON.stringify({age: 20, name: 'Jon Doe'}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'dodo@example.com',
        roleId: getRoleIdByTitle(roles[0], userRoles.author),
        status: 'active',
        password: await bcrypt.hash('pass123', 8),
        secretWord: await bcrypt.hash('qwerty', 10),
        userInfo: JSON.stringify({age: 20, name: 'Jon Doe'}),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', [
      ...userList,
    ]);
  },

  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
