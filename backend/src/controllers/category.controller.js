const {
  getTransformedCategoryList,
  getAllCategories,
  getCategoryInfo,
  getCategoryPostListWithDetails,
  createNewCategory,
  updateCategory,
  deleteCategory,
  validateCategoryCreateData,
} = require('src/services/category.service');
const {moderatorAuth} = require('src/middleware/auth.middleware');
const {setBadRequest} = require('src/middleware/exception.middleware');

async function categoryList(ctx) {
  try {
    const categories = await getAllCategories();
    const transformedCategoryList = await getTransformedCategoryList(categories);

    ctx.status = 200;
    ctx.body = [...transformedCategoryList];
  } catch (error) {
    console.error('Error_controller categoryList:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function categoryDetail(ctx) {
  try {
    const {id} = ctx.params;

    const category = await getCategoryInfo(id);
    const postList = await getCategoryPostListWithDetails(category.id);
    ctx.status = 200;
    ctx.body = {...category, postList};
  } catch (error) {
    console.error('Error_controller categoryDetail:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function categoryCreate(ctx) {
  try {
    const {title} = ctx.request.body;

    await moderatorAuth(ctx);
    await validateCategoryCreateData(title);

    const category = await createNewCategory(title, ['id', 'title', 'createdAt']);

    ctx.status = 200;
    ctx.body = {
      ...category,
    };
  } catch (error) {
    console.error('Error_controller categoryCreate:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function categoryUpdate(ctx) {
  try {
    const {id} = ctx.params;
    const {category} = ctx.request.body;

    await moderatorAuth(ctx);

    const updatedCategory = await updateCategory(id, category);
    ctx.status = 200;
    ctx.body = {
      ...updatedCategory,
    };
  } catch (error) {
    console.error('Error_controller categoryCreate:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function categoryDelete(ctx) {
  try {
    const {id} = ctx.params;
    await moderatorAuth(ctx);

    await deleteCategory(id);

    ctx.status = 200;
    ctx.body = {
      deleted: true,
    };
  } catch (error) {
    console.error('Error_controller categoryDelete:', error.message);
    await setBadRequest(ctx, error);
  }
}

module.exports = {
  categoryList,
  categoryDetail,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
};
