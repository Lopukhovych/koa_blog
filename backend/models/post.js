'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        title: DataTypes.STRING,
        content: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
        imageUrl: DataTypes.TEXT
    }, {});
    Post.associate = function (models) {
        // associations can be defined here
        Post.hasMany(models.Comment, {
            foreignKey: 'postId',
            as: 'comments',
            onDelete: 'CASCADE',
        });

        Post.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'author',
            onDelete: 'CASCADE',
        })
    };
    return Post;
};
