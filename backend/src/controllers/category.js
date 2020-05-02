const {
  getTransformedCategoryList,
  getAllCategories,
  getCategoryInfo,
  getCategoryPostListWithDetails,
  createNewCategory,
  updateCategory,
  deleteCategory,
} = require('src/services/category');
const {authAdmin} = require('src/middleware/auth');
const {setBadRequest} = require('src/middleware/exception');

async function categoryList(ctx) {
  try {
    const categories = await getAllCategories();
    const transformedCategoryList = await getTransformedCategoryList(categories);

    ctx.status = 200;
    ctx.body = [...transformedCategoryList];
  } catch (error) {
    setBadRequest(ctx, error);
  }
}

async function categoryDetail(ctx) {
  try {
    const {id} = ctx.params;

    if (!id) {
      return setBadRequest(ctx, {
        message: 'No category id',
      });
    }

    const category = await getCategoryInfo(id);

    if (!category) {
      return setBadRequest(ctx, {
        message: 'Can\'t find category',
      });
    }

    const postList = await getCategoryPostListWithDetails(category.id);
    ctx.status = 200;
    ctx.body = {...category, postList};
  } catch (error) {
    setBadRequest(ctx, error);
  }
}

async function categoryCreate(ctx, next) {
  try {
    await authAdmin(ctx, next);


    const {title} = ctx.request.body;
    if (!title) {
      return setBadRequest(ctx, {
        message: 'Can\'t find category',
      });
    }

    const category = await createNewCategory(title, ['id', 'title', 'createdAt']);

    ctx.status = 200;
    ctx.body = {
      ...category,
    };
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      ctx.throw(400, 'Foreign key does not exist');
    }
    ctx.throw(400, error);
  }
}

async function categoryUpdate(ctx, next) {
  try {
    await authAdmin(ctx, next);

    const {id} = ctx.params;
    const {category} = ctx.request.body;
    if (!id || !category) {
      return setBadRequest(ctx, {
        message: 'No category id or body',
      });
    }

    const {error, ...updatedCategory} = await updateCategory(id, category);

    if (error) {
      return setBadRequest(ctx, {
        message: error,
      });
    }
    ctx.status = 200;
    ctx.body = {
      ...updatedCategory,
    };
  } catch (error) {
    console.log(' error: ', error);
    setBadRequest(ctx, error);
  }
}

async function categoryDelete(ctx, next) {
  try {
    await authAdmin(ctx, next);

    const {id} = ctx.params;

    if (!id) {
      return setBadRequest(ctx, {
        message: 'No category id',
      });
    }

    const {error, status} = await deleteCategory(id);

    if (error) {
      return setBadRequest(ctx, {
        message: error,
      });
    }

    ctx.status = 200;
    ctx.body = {
      status,
    };
  } catch (error) {
    console.log(' error: ', error);
    setBadRequest(ctx, error);
  }
}

module.exports = {
  categoryList,
  categoryDetail,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
};
