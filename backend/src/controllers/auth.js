const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const models = require("../../models/index");
const jwt_auth = require('../auth/index');

const secret = process.env.JWT_SECRET || 'jwt_secret';

module.exports = {
    auth: async function (ctx, next) {
        try {
            console.log('ctx.request.header: ', ctx.request.header);
            const token = ctx.request.header.authorization;
            // const verified = jsonwebtoken.verify(token, secret);
            const verified = await jwt_auth.verify(token);
            if (!verified) {
                return setUnauthorized(ctx);
            }
            next();
        } catch (error) {
            console.log('controllers auth error');
            throw Error(error);
        }

    },
    login: async function (ctx) {
        try {
            const user = await getUserByEmail(ctx);
            const enteredPass = ctx.request.body.password.toString();
            if (!user || !enteredPass) {
                return setUnauthorized(ctx);
            }
            const {
                password,
                ...userInfoWithoutPassword
            } = user;

            const compared = await bcrypt.compare(enteredPass, password);
            if (compared) {
                const token = await jwt_auth.sign({...userInfoWithoutPassword});
                const userInfo = {
                    name: userInfoWithoutPassword['name'],
                    email: userInfoWithoutPassword['email']
                };
                ctx.body = {token, ...userInfo}
            } else {
                return setUnauthorized(ctx);
            }
        } catch (error) {
            return setUnauthorized(ctx);
        }
    },
    signup: async function (ctx, next) {
        if (!ctx.request.body.name || !ctx.request.body.password || !ctx.request.body.email) {
            ctx.status = 400;
            ctx.body = {
                error: 'expected an object with username, password, email, name but didn\'t  get this params'
            };
        }
        const userData = {...ctx.request.body};
        userData.password = await bcrypt.hash(ctx.request.body.password, 8);
        const user = await getUserByEmail(ctx);
        if (!user) {
            result = await models.Users.create(userData);
            if (result) {
                return this.login(ctx);
            }
            ctx.status = 200;
            ctx.body = {
                message: "success"
            };
            next();
        } else {
            ctx.status = 406;
            ctx.body = {
                error: "User with such email already exist"
            };
        }

    },
    badRequest: async function (ctx, error) {
        ctx.status = 400;
        ctx.body = {
            originalError: 'Bad Request',
            message: error.message
        };
    }
};

async function getUserByEmail(ctx) {
    try {
        const email = ctx.request.body.email.toString();
        const user = await models.Users.findOne({where: {email: email}, raw: true});
        return user ? user : null;
    } catch (error) {
        console.error('getUserByEmail error: ', error.message);
    }

}

async function setUnauthorized(ctx) {
    return ctx.throw(
        401,
        "UNAUTHORIZED",
        {
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"'
            }
        }
    );

}




