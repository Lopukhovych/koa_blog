'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let migrations = [];
    const tableName = 'Users';

    queryInterface.describeTable(tableName)
      .then(tableDefinition => {
        if (tableDefinition.name) {
          migrations.push(queryInterface.removeColumn('Users', 'name'));
        }
        if (tableDefinition.email) {
          migrations.push(queryInterface.removeColumn('Users', 'email'))
        }
        if (!tableDefinition.status) {
          migrations.push(queryInterface.addColumn('Users', 'status', Sequelize.STRING));
        }
        if (!tableDefinition.roleId) {
          migrations.push(queryInterface.addColumn('Users', 'roleId', {
            type: Sequelize.INTEGER,
            references: {
              model: "Roles",
              key: 'id'
            },
            defaultValue: 1,
            allowNull: false
          }));
        }
        if (!tableDefinition.userInfo) {
          migrations.push(queryInterface.addColumn('Users', 'userInfo', {
            type: Sequelize.JSONB,
            defaultValue: {},
            allowNull: false
          }));
        }

      });
    return queryInterface.sequelize.transaction(function () {
      return Promise.all(migrations);
    });
  },

  down: (queryInterface, Sequelize) => {
    let migrations = [];
    const tableName = 'Users';

    queryInterface.describeTable(tableName)
      .then(tableDefinition => {
        if (!tableDefinition.name) {
          migrations.push(queryInterface.addColumn('Users', 'name', {type: Sequelize.STRING}));
        }
        if (!tableDefinition.email) {
          migrations.push(queryInterface.addColumn('Users', 'email', {type: Sequelize.STRING}));
        }
        if (tableDefinition.status) {
          migrations.push(queryInterface.removeColumn('Users', 'status'));
        }
        if (tableDefinition.roleId) {
          migrations.push(queryInterface.removeColumn('Users', 'roleId'));
        }
        if (tableDefinition.userInfo) {
          migrations.push(queryInterface.removeColumn('Users', 'userInfo'));
        }
      });

    return queryInterface.sequelize.transaction(function () {
      return Promise.all(migrations);
    });
  }
};
