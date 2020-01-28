const models = require('models');
const Sequelize = require('sequelize');
const {articleStatus} = require('src/constants');
const {authAdmin, setBadRequest} = require('src/utils/auth');

async function categoryList(ctx) {
  try {
    const categories = await models.Category.findAll({
      attributes: ['id', 'title'],
      raw: true,
    });
    const transformedCategoryList = await Promise.all(categories.map(async (category) => ({
      ...category,
      postList: await models.Post.findAll({
        attributes: [
          'id', 'title', 'imageUrl',
        ],
        where: Sequelize.and(
          {categoryId: category.id},
          {status: articleStatus.published},
        ),
        order: [
          ['viewNumber', 'DESC'],
        ],
        limit: 3,
        raw: true,
      }),
    })));

    ctx.status = 200;
    ctx.body = [...transformedCategoryList];
  } catch (error) {
    setBadRequest(ctx, error);
  }
}

async function categoryDetail(ctx) {
  try {
    const category = await models.Category.findOne({
      attributes: ['id', 'title', 'description'],
      where: {
        id: ctx.params.id,
      },
      raw: true,
    });

    if (!category) {
      return setBadRequest(ctx, {
        message: 'Can\'t find category',
      });
    }

    const postList = await models.Post.findAll({
      attributes: [
        'id', 'title', 'imageUrl', 'publishedDate', 'userId', 'viewNumber',
      ],
      where: Sequelize.and(
        {categoryId: category.id},
        {status: articleStatus.published},
      ),
      include: {
        model: models.Users,
        attributes: ['email', 'userInfo'],
        required: false,
        as: 'author',
      },
      order: [
        ['viewNumber', 'DESC'],
      ],
      limit: 10,
      raw: true,
    });
    postList.forEach((post) => {
      if (post['author.userInfo'] && post['author.userInfo'].name) {
        post['author.name'] = post['author.userInfo'].name;
        delete post['author.userInfo'];
      }
    });

    ctx.status = 200;
    ctx.body = {...category, postList};
  } catch (error) {
    setBadRequest(ctx, error);
  }
}

async function categoryCreate(ctx, next) {
  const requestBody = ctx.request.body;
  try {
    await authAdmin(ctx, next);
    const newCategory = {
      title: requestBody.title.toString(),
    };
    const {
      id, title, createdAt,
    } = await models.Category.create(newCategory);
    ctx.status = 200;
    ctx.body = {
      id,
      title,
      createdAt,
    };
  } catch (error) {
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      ctx.throw(400, 'Foreign key does not exist');
    }
    ctx.throw(400, error);
  }
}

async function categoryUpdate(ctx) {
  const category = await models.Category.findOne({where: {id: ctx.params.id}});
  ctx.body = await category.update(ctx.request.body.category);
}

async function categoryDelete(ctx) {
  const category = await models.Category.findOne({where: {id: +ctx.params.id}});
  await category.destroy();
  ctx.body = {deleted: true};
}

module.exports = {
  categoryList,
  categoryDetail,
  categoryCreate,
  categoryUpdate,
  categoryDelete,
};
