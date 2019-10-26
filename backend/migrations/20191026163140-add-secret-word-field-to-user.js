'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'secretWord', {
      type: Sequelize.TEXT,
      defaultValue: null
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
        'Users',
        'secretWord'
    );
  }
};
