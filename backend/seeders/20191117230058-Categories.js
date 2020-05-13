const {categories} = require('./constants');

module.exports = {
  up: async (queryInterface) => {
    const categoryList = Object.values(categories).map((category) => (
      {
        title: category,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ));
    await queryInterface.bulkInsert('Categories', [
      ...categoryList,
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
