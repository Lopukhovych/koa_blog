module.exports = {
    handleException: async function(ctx, next) {
        return next().catch(err => {
            const { statusCode, message } = err;

            ctx.type = 'json';
            ctx.status = statusCode || 500;
            ctx.body = {
                status: 'error',
                message
            };

            ctx.app.emit('error', err, ctx);
        });
    }
};
