const logger = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const mount  = require('koa-mount');
const serve  = require('koa-static');

const app = require('./app');
const router = require('./routes');

const {notFound, unauthorized} = require('src/middleware/notFound');
const {handleException} = require('src/middleware/exception');
const port = 3200;

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});

app.use(logger('tiny'));

app.use(handleException);

app.use(bodyParser({
    enableTypes: ['json', 'form'],
    extendTypes: {
        json: ['application/json'] // will parse application/x-javascript type body as a JSON string
    },
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }
}));
app.use(unauthorized);

app.use(router.routes());
app.use(router.allowedMethods());

// app.use(async ctx => {
//     ctx.body = 'I am your first KOA API!'
// });
app.use( mount( '/', serve('./public') ) ) ;
// for future admin page
// app.use( mount( '/admin', serve('./admin') ) ) ;

app.use(notFound);

app.on('error', err => {
    console.error('server error', err)
});

const server = app.listen(port);
console.log(`Run server on  http://localhost:${port}`);

exports.closeServer = function(){
    server.close();
};

// Implement with admin middleware to check if user is admin
//var app = require('koa')();
// var router = require('koa-router')();
// var compose = require('koa-compose');
//
// var allMiddlewares = compose([m1,m2,m3]);
//
// router.get('/', allMiddlewares);
// // selectively enable logging middleware for this route
// router.get('/test', compose(logger, allMiddlewares));
//
// app
//   .use(router.routes())
//   .use(router.allowedMethods());
