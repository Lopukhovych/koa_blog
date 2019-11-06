"use strict";
module.exports = ( sequelize, DataTypes ) => {
  const Role = sequelize.define( "Role", {
    title: DataTypes.STRING
  }, {} );
  Role.associate = function( models ) {
    Role.belongsToMany( models.Permission, {
      through: "RolePermission",
      as: "roles",
      foreignKey: "roleId",
      otherKey: "permissionId",
      onDelete: "CASCADE"
    } );
    Role.hasMany( models.Users, {
      foreignKey: "roleId",
      as: "users",
      onDelete: "CASCADE"
    } );
  };
  return Role;
};
