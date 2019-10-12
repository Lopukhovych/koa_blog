'use strict';
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        freezeTableName: true,
    });
    Users.associate = function (models) {
        // associations can be defined here
        Users.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'posts',
            onDelete: 'CASCADE',
        });

        Users.hasMany(models.Comment, {
            foreignKey: 'userId',
            as: 'comments',
            onDelete: 'CASCADE',
        });
    };
    return Users;
};
