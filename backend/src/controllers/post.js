const models = require("../../models/index");

async function post_list(ctx) {
    const post_list = await models.Post.findAll();
    ctx.body = {post_list};
}

async function post_detail(ctx) {
    try {
        const post = await models.Post.findOne({where: {id: ctx.params.id}});
        ctx.body = post;
    } catch (error) {
        console.log(error.message);
    }
}

async function post_create(ctx) {
    const requestBody = ctx.request.body;
    ctx.status = 200;
    ctx.body = await models.Post.create(requestBody.comment);
}

async function post_update(ctx) {
    let post = await models.Post.findOne({where: {id: ctx.params.id}});
    post = await post.update(ctx.request.body.post);
    ctx.body = {post};
}

async function post_delete(ctx) {
    let post = await models.Post.findOne({where: {id: ctx.params.id}});
    await post.destroy();
    ctx.body = {deleted: true};
}

async function getPostById(id) {
  try {
    return models.Post.findOne({ where: { id }, raw: true });
  } catch (error) {
    console.error('getPostById error: ', error.message);
    return error;
  }
}

module.exports = {
  post_list, post_detail, post_create, post_update, post_delete, getPostById,
};
