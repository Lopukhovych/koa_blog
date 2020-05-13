const {getRoleIdByTitle, getUsersByRoleId, getCategoryIdByTitle} = require('./utils');
const {userRoles, articleStatus} = require('../src/constants');
const {categories} = require('./constants');


// const getRoleIdByTitle = (roleList, title) => roleList.filter((role) => role.title === title)[0].id;

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize
      .query('SELECT id, "roleId" FROM "Users"', {raw: true});

    const roles = await queryInterface.sequelize
      .query('SELECT id, title FROM "Roles"', {raw: true});

    const categoryList = await queryInterface.sequelize
      .query('SELECT id, title FROM "Categories"', {raw: true});

    const authorRoleId = getRoleIdByTitle(roles[0], userRoles.author);
    const author = getUsersByRoleId(users[0], authorRoleId)[0];
    const technologyId = getCategoryIdByTitle(categoryList[0], categories.technology);
    const businessId = getCategoryIdByTitle(categoryList[0], categories.business);

    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          userId: author.id,
          title: 'Ukraine ranks 49th in the English',
          content: '<h1>Ukraine ranks 49th in the English proficiency ranking. Language skills are low</h1>',
          imageUrl: 'https://ain.ua/en/wp-content/uploads/sites/2/2019/11/1-eng.jpg?x54316',
          categoryId: businessId,
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedDate: new Date(),
          status: articleStatus.published,
          viewNumber: 10,
        },
        {
          userId: author.id,
          title: 'Qwerty qwe 123456',
          content: '<h1>Kharkiv IT industry in figures: 31,000 IT specialists, average salary – $2,025</h1>',
          imageUrl: 'https://ain.ua/en/wp-content/uploads/sites/2/2019/11/kha1.jpg',
          categoryId: businessId,
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedDate: new Date(),
          status: articleStatus.inReview,
          viewNumber: 0,
        },
        {
          userId: author.id,
          title: 'Ukrainian startup Animal ID raises $500k at a $5M valuation',
          content: '<p>The Ukrainian platform for pet owners <a href="https://animal-id.net/en" target="_blank">'
            + 'Animal ID</a> raised $500,000 at a valuation of $5 million. The team does not disclose information'
            + ' about investors, but notes that these are “several business angels.” The editor of AIN.UA talked to'
            + ' the founders of Animal ID and found out what the startup does, what results it has reached, and what'
            + ' goals it aims to achieve.</p>',
          imageUrl: 'https://ain.ua/en/wp-content/uploads/sites/2/2019/11/Снимок-111.png?x54316',
          categoryId: technologyId,
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedDate: new Date(),
          status: articleStatus.published,
          viewNumber: 25600,
        },
      ],
    );
  },
  down: (queryInterface) => queryInterface.bulkDelete('Posts', null, {}),
};
