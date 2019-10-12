const models = require("../../models/index");
const {auth, badRequest} = require("./auth");

async function comment_list(ctx, next) {
    try {
        await auth(ctx, next);
        const comments = await models.Comment.findAll();
        console.log('comments: ', comments);
        ctx.status = 200;
        ctx.body = {comments};
    } catch (error) {
        badRequest(ctx, error);
        // console.log('comment_list error: ', error);
    }

}

async function comment_detail(ctx) {
    try {
        const comment = await models.Comment.findOne({where: {id: ctx.params.id}});
        console.log(JSON.parse(JSON.stringify(comment)));
        ctx.body = comment;
    } catch (error) {
        console.log(error.message);
    }
}

async function comment_update(ctx) {
    let comment = await models.Comment.findOne({where: {id: ctx.params.id}});
    comment = await comment.update(ctx.request.body.comment);
    ctx.body = {comment};
}

async function comment_create(ctx) {
    const requestBody = ctx.request.body;
    ctx.status = 200;
    ctx.body = await models.Comment.create(requestBody.comment);
}

async function comment_delete(ctx) {
    let comment = await models.Comment.findOne({where: {id: ctx.params.id}});
    await comment.destroy();
    ctx.body = {deleted: true};
}

module.exports = {comment_list, comment_detail, comment_update, comment_create, comment_delete};

