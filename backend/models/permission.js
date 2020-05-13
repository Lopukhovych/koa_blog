"use strict";
module.exports = ( sequelize, DataTypes ) => {
  const Permission = sequelize.define( "Permission", {
    title: DataTypes.STRING
  }, {} );
  Permission.associate = function( models ) {
    Permission.belongsToMany( models.Role, {
      through: "RolePermission",
      as: "roles",
      foreignKey: "permissionId",
      otherKey: "roleId",
      onDelete: "CASCADE"
    } );
  };
  return Permission;
};
