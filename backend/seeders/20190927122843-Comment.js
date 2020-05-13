const {getPostsByStatus, getUsersByStatus} = require('./utils');
const {articleStatus, userStatus} = require('../src/constants');

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize
      .query('SELECT id, status FROM "Users"', {raw: true});

    const postList = await queryInterface.sequelize
      .query('SELECT id, status FROM "Posts"', {raw: true});

    const activeUsers = getUsersByStatus(users[0], userStatus.active);
    const publishedPosts = getPostsByStatus(postList[0], articleStatus.published);

    await queryInterface.bulkInsert(
      'Comments',
      [
        {
          userId: users[0] ? activeUsers[0].id : -1,
          postId: publishedPosts[0].id,
          comment:
            'Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: users[0] ? activeUsers[1].id : -1,
          postId: publishedPosts[1].id,
          comment:
            'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.'
            + ' Quisque porta volutpat erat.',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    );
  },
  down: (queryInterface) => queryInterface.bulkDelete('Comments', null, {}),
};
