'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Posts', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: 'id'},
      allowNull: false
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Posts', 'userId', {
      type: Sequelize.INTEGER,
    });
  }
};
