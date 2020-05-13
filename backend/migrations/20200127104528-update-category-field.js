const tableName = 'Categories';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const migrations = [];
    const updateCategoryField = (transaction) => queryInterface.describeTable(tableName)
      .then((tableDefinition) => {
        if (!tableDefinition.description) {
          migrations.push(queryInterface.addColumn('Categories', 'description', Sequelize.TEXT, { transaction }));
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
        if (tableDefinition.description) {
          migrations.push(queryInterface.removeColumn('Categories', 'description', {transaction}));
        }
      });

    return queryInterface.sequelize
      .transaction((transaction) => undoUpdateCategoryField(transaction)
        .then(() => Promise.all(migrations)));
  },
};
