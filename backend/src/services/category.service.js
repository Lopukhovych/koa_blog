const {proceedAuthorInfo} = require('src/utils/author.util');
const {
  findPostListByCategoryId,
  findCategoryPostListWithUserAndDetails,
} = require('src/resources/post.resource');
const {
  findAllCategories, createCategory, findCategoryByPk,
} = require('src/resources/category.resource');

async function getTransformedCategoryList(categories) {
  try {
    return Promise.all(categories.map(async (category) => ({
      ...category.toJSON(),
      postList: await findPostListByCategoryId(category.id),
    })));
  } catch (error) {
    console.error('Error_service getTransformedCategoryList:', error);
    throw new Error('Cannot proceed category list');
  }
}

async function getAllCategories() {
  try {
    return findAllCategories();
  } catch (error) {
    console.error('Error_service getAllCategories:', error);
    throw new Error('Cannot get category list');
  }
}

async function getCategoryInfo(id) {
  try {
    const category = await findCategoryByPk(id);
    return category.getOptions(['id', 'title', 'description']);
  } catch (error) {
    console.error('Error_service getCategoryInfo:', error);
    throw new Error('Cannot get category info');
  }
}

async function getCategoryPostListWithDetails(categoryId) {
  try {
    const postList = await findCategoryPostListWithUserAndDetails(categoryId);
    postList.forEach(proceedAuthorInfo);
    return postList;
  } catch (error) {
    console.error('Error_service getCategoryPostListWithDetails:', error);
    throw new Error('Cannot get category articles');
  }
}

async function validateCategoryCreateData(title) {
  try {
    if (!title) {
      throw new Error();
    }
  } catch (error) {
    console.error('Error_service getCategoryPostListWithDetails:', error);
    throw new Error('Invalid category data');
  }
}

async function createNewCategory(categoryTitle, options = []) {
  try {
    const [obj] = await createCategory(categoryTitle.toString());
    return obj.getOptions(options);
  } catch (error) {
    console.error('Error_service createNewCategory:', error);
    throw new Error('Invalid category title');
  }
}

async function updateCategory(id, updatedCategory) {
  try {
    const category = await findCategoryByPk(id);
    if (!category || !updatedCategory) {
      throw new Error();
    }
    await category.update(updatedCategory);
    return category.getOptions(['id', 'title', 'createdAt']);
  } catch (error) {
    console.error('Error_service updateCategory:', error);
    throw new Error('Invalid category data');
  }
}

async function deleteCategory(id) {
  try {
    const category = await findCategoryByPk(id);
    if (!category) {
      throw new Error();
    }
    await category.destroy();
  } catch (error) {
    console.error('Error_service deleteCategory:', error);
    throw new Error('Invalid category data');
  }
}

async function getCategoryById(categoryId) {
  try {
    const category = await findCategoryByPk(categoryId);
    if (!category) {
      throw new Error();
    }
    return category;
  } catch (error) {
    console.error('Error_service getCategoryById:', error);
    throw new Error('Invalid category data');
  }
}

module.exports = {
  getTransformedCategoryList,
  getAllCategories,
  getCategoryInfo,
  getCategoryPostListWithDetails,
  createNewCategory,
  updateCategory,
  deleteCategory,
  validateCategoryCreateData,
  getCategoryById,
};
