'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Posts', 'imageUrl', Sequelize.TEXT);
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn(
        'Posts',
        'imageUrl'
    );
  }
};
