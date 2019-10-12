const models = require("../../models/index");

async function user_list(ctx) {
    const user_list = await models.Users.findAll();
    ctx.body = {user_list};
}

async function user_detail(ctx) {
    try {
        const user = await models.Users.findOne({where: {id: ctx.params.id}});
        console.log('user: ', user);
        ctx.body = user;
    } catch (error) {
        console.log(error.message);
    }
}

async function user_create(ctx) {
    const requestBody = ctx.request.body;
    ctx.status = 200;
    ctx.body = await models.Users.create(requestBody.comment);
}

async function user_update(ctx) {
    let user = await models.Users.findOne({where: {id: ctx.params.id}});
    user = await user.update(ctx.request.body.user);
    ctx.body = {user};
}

async function user_delete(ctx) {
    let user = await models.Users.findOne({where: {id: ctx.params.id}});
    await user.destroy();
    ctx.body = {deleted: true};
}

module.exports = {user_list, user_detail, user_create, user_update, user_delete};

