module.exports = {
  up: (queryInterface, Sequelize) => {
    const migrations = [];
    const tableName = 'Posts';
    const refactorPosts = (transaction) => queryInterface.describeTable(tableName)
      .then((tableDefinition) => {
        if (!tableDefinition.publishedDate) {
          migrations.push(queryInterface.addColumn('Posts', 'publishedDate', Sequelize.DATEONLY, { transaction }));
        }
        if (!tableDefinition.status) {
          migrations.push(queryInterface.addColumn('Posts', 'status', Sequelize.STRING, { transaction }));
        }
        if (!tableDefinition.viewNumber) {
          migrations.push(queryInterface.addColumn('Posts', 'viewNumber', Sequelize.INTEGER, { transaction }));
        }
      });

    return queryInterface.sequelize
      .transaction((transaction) => refactorPosts(transaction)
        .then(() => Promise.all(migrations)));
  },

  down: (queryInterface) => {
    const migrations = [];
    const tableName = 'Posts';
    const undoRefactorPosts = (transaction) => queryInterface.describeTable(tableName)
      .then((tableDefinition) => {
        if (tableDefinition.publishedDate) {
          migrations.push(queryInterface.removeColumn('Posts', 'publishedDate', { transaction }));
        }
        if (tableDefinition.status) {
          migrations.push(queryInterface.removeColumn('Posts', 'status', { transaction }));
        }
        if (tableDefinition.viewNumber) {
          migrations.push(queryInterface.removeColumn('Posts', 'viewNumber', { transaction }));
        }
      });

    return queryInterface.sequelize
      .transaction((transaction) => undoRefactorPosts(transaction)
        .then(() => Promise.all(migrations)));
  },
};
