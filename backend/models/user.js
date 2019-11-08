module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    password: DataTypes.STRING,
    secretWord: DataTypes.STRING,
    userInfo: DataTypes.JSONB,
  }, {
    freezeTableName: true,
  });
  Users.associate = (models) => {
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

    Users.belongsTo(models.Role, {
      foreignKey: 'roleId',
      as: 'role',
      onDelete: 'CASCADE',
    });
  };
  return Users;
};
