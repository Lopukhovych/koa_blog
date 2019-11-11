'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const createCategories = (transaction) =>  queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, { transaction });

    const addCategoryIdToPost = (transaction) => queryInterface.describeTable('Posts')
      .then(tableDefinition => {
        if(!tableDefinition.categoryId) {
          return queryInterface.addColumn('Posts', 'categoryId', {
            type: Sequelize.INTEGER,
            references: {
              model: "Categories",
              key: 'id'
            },
            allowNull: true,
            defaultValue: null
          }, {transaction});
        }
      });

    return queryInterface.sequelize
      .transaction(transaction =>
        createCategories(transaction)
          .then(() => addCategoryIdToPost(transaction))
      );
  },
  down: (queryInterface) => {
    const removeCategorytable = (transaction) =>
      queryInterface.dropTable('Categories', {transaction});

    const removeCategoryIdFromPost = (transaction) =>
      queryInterface.describeTable('Posts')
        .then(tableDefinition => {
          if(tableDefinition.categoryId) {
            return queryInterface.removeColumn('Posts', 'categoryId', {transaction});
          }
        });

    return queryInterface.sequelize
      .transaction(transaction =>
        removeCategoryIdFromPost(transaction)
          .then(() => removeCategorytable(transaction))
      );
  }
};
