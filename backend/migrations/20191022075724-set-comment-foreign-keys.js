'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    let migrations = [];

    migrations.push(queryInterface.changeColumn('Comments', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: 'id'
      },
      allowNull: false
    }));

    migrations.push(queryInterface.changeColumn('Comments', 'postId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Posts",
        key: 'id'
      },
      allowNull: false
    }));

    return Promise.all(migrations);
  },
  down: function(queryInterface, Sequelize) {
    let migrations = [];

    migrations.push(queryInterface.changeColumn('Comments', 'userId', {
      type: Sequelize.INTEGER,
    }));
    migrations.push(queryInterface.changeColumn('Comments', 'postId', {
      type: Sequelize.INTEGER,
    }));

    return Promise.all(migrations);
  }

};
