
const tableName = 'Users';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const migrations = [];
    const updateCategoryField = (transaction) => queryInterface.describeTable(tableName)
      .then((tableDefinition) => {
        if (!tableDefinition.googleId) {
          migrations.push(queryInterface.addColumn(tableName, 'googleId', Sequelize.STRING, { transaction }));
        }
        if (!tableDefinition.facebookId) {
          migrations.push(queryInterface.addColumn(tableName, 'facebookId', Sequelize.STRING, { transaction }));
        }
        if (!tableDefinition.refreshData) {
          migrations.push(queryInterface.addColumn(tableName, 'refreshData', {
            type: Sequelize.JSONB,
            defaultValue: {},
            allowNull: true,
          },
          { transaction }));
        }
      });
    return queryInterface.sequelize
      .transaction((transaction) => updateCategoryField(transaction)
        .then(() => Promise.all(migrations)));
  },

  down: (queryInterface) => {
    const migrations = [];
    const undoUpdateCategoryField = (transaction) => queryInterface.describeTable(tableName)
      .then((tableDefinition) => {
        if (tableDefinition.googleId) {
          migrations.push(queryInterface.removeColumn(tableName, 'googleId', {transaction}));
        }
        if (tableDefinition.facebookId) {
          migrations.push(queryInterface.removeColumn(tableName, 'facebookId', {transaction}));
        }
        if (tableDefinition.refreshData) {
          migrations.push(queryInterface.removeColumn(tableName, 'refreshData'));
        }
      });

    return queryInterface.sequelize
      .transaction((transaction) => undoUpdateCategoryField(transaction)
        .then(() => Promise.all(migrations)));
  },
};
