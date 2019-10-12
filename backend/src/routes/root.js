const koa_static =require('koa-static');
// app.use(('./build'));
module.exports = (router) => {
    return router
        .get('/', (ctx) => {
            ctx.body = 'I am volod root!';
            // ctx.body = koa_static('./public');
        });
};
