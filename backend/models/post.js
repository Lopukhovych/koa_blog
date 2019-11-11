"use strict";
module.exports = ( sequelize, DataTypes ) => {
  const Post = sequelize.define( "Post", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER
  }, {} );
  Post.associate = function( models ) {
    Post.hasMany( models.Comment, {
      foreignKey: "postId",
      as: "comments",
      onDelete: "CASCADE"
    } );
    
    Post.belongsTo( models.Users, {
      foreignKey: "userId",
      as: "author",
      onDelete: "CASCADE"
    } );
    
    Post.belongsTo( models.Category, {
      foreignKey: "categoryId",
      as: "category",
      onDelete: "CASCADE"
    } );
  };
  return Post;
};
