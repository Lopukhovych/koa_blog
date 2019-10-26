const bcrypt = require('bcryptjs');
const models = require("../../models/index");
const jwt_auth = require('../auth/index');

module.exports = {
    auth: async function (ctx, next) {
        try {
            console.log('ctx.request.header: ', ctx.request.header);
            const token = ctx.request.header.authorization;
            const verified = await jwt_auth.verify(token);
            if (!verified) {
                return setUnauthorized(ctx);
            }
            next();
        } catch (error) {
            console.error('controllers auth error');
            throw Error(error);
        }

    },
    initialize: async function (ctx) {
        try {
            const token = ctx.request.body.token;
            const verified = await jwt_auth.verify(token);
            if (!verified) {
                return setUnauthorized(ctx);
            }
            const decodedData = await jwt_auth.decode(token).payload;
            const user = await getUserById(decodedData.id);
            const {
                password,
                secretWord,
                ...userInfoWithoutPassword
            } = user;
            const userInfo = await getResponseUserInfo(userInfoWithoutPassword);
            if (Math.floor((new Date(decodedData.exp * 1000) - new Date()) / (1000 * 3600 * 24)) < 2) {
                const refreshToken = await jwt_auth.sign({...userInfoWithoutPassword});
                return ctx.body = {refreshToken, ...userInfo}
            }
            ctx.body = {...userInfo}
        } catch (error) {
            return setUnauthorized(ctx);
        }
    },
    login: async function (ctx) {
        try {
            const email = ctx.request.body.email.toString();
            const enteredPass = ctx.request.body.password.toString();
            const user = await getUserByEmail(email);
            if (!user || !enteredPass) {
                return setUnauthorized(ctx);
            }
            const {
                password,
                secretWord,
                ...userInfoWithoutPassword
            } = user;

            const compared = await bcrypt.compare(enteredPass, password);
            if (compared) {
                const token = await jwt_auth.sign({...userInfoWithoutPassword});
                const userInfo = await getResponseUserInfo(userInfoWithoutPassword);
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
        userData.secretWord = await bcrypt.hash(ctx.request.body.secretWord, 10);
        const email = ctx.request.body.email.toString();
        const user = await getUserByEmail(email);
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

async function getUserByEmail(email) {
    try {
        return models.Users.findOne({where: {email: email}, raw: true});
    } catch (error) {
        console.error('getUserByEmail error: ', error.message);
    }
}

async function getUserById(id) {
    try {
        return models.Users.findOne({where: {id: id}, raw: true});
    } catch (error) {
        console.error('getUserById error: ', error.message);
    }
}

async function setUnauthorized(ctx) {
    return ctx.throw(
        401,
        "UNAUTHORIZED",
        {headers: {'WWW-Authenticate': 'Basic realm="Secure Area"'}}
    );
}

async function setForbidden(ctx) {
    return ctx.throw(
        403,
        "FORBIDDEN",
        {headers: {'WWW-Authenticate': 'Basic realm="Secure Area"'}}
    );
}

async function getResponseUserInfo(user) {
    return {
        id: user['id'],
        name: user['name'],
        email: user['email']
    };
}

