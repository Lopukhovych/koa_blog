module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {});
  Category.associate = function (models) {
    Category.hasMany(models.Post, {
      foreignKey: 'categoryId',
      as: 'posts',
      onDelete: 'CASCADE',
    });
  };
  return Category;
};
