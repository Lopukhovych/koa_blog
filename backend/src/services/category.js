const Sequelize = require('sequelize');

const {articleStatus} = require('src/constants');
const {
  findPostList,
  findCategoryPostListWithUserAndDetails,
} = require('src/resources/post');
const {
  findAllCategories, createCategory, findCategoryByPk,
} = require('src/resources/category');

// TODO optimize, get all posts and categories and map it
// TODO not to make request queue to db
async function getTransformedCategoryList(categories) {
  return Promise.all(categories.map(async (category) => ({
    ...category,
    postList: await findPostList({
      attributes: ['id', 'title', 'imageUrl'],
      where: Sequelize.and(
        {categoryId: category.id},
        {status: articleStatus.published},
      ),
      order: [['viewNumber', 'DESC']],
      limit: 3,
      raw: true,
    }),
  })));
}

async function getAllCategories() {
  return findAllCategories();
}

async function getCategoryInfo(id) {
  const category = await findCategoryByPk(id);
  return category.getOptions(['id', 'title', 'description']);
}

async function getCategoryPostListWithDetails(categoryId) {
  const postList = await findCategoryPostListWithUserAndDetails(categoryId);

  postList.forEach((post) => {
    if (post['author.userInfo'] && post['author.userInfo'].name) {
      post['author.name'] = post['author.userInfo'].name;
      delete post['author.userInfo'];
    }
  });
  return postList;
}

async function createNewCategory(categoryTitle, options = []) {
  const [obj] = await createCategory(categoryTitle.toString());
  return obj.getOptions(options);
}

async function updateCategory(id, updatedCategory) {
  const category = await findCategoryByPk(id);
  if (category) {
    await category.update(updatedCategory);
    return category.getOptions(['id', 'title', 'createdAt']);
  }
  return {
    error: `No category with id: ${id}`,
  };
}

async function deleteCategory(id) {
  const category = await findCategoryByPk(id);
  if (category) {
    await category.destroy();
    return {status: true};
  }
  return {
    error: `No category with id: ${id}`,
  };
}

module.exports = {
  getTransformedCategoryList,
  getAllCategories,
  getCategoryInfo,
  getCategoryPostListWithDetails,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
