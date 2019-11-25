const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const models = require('models/index');
const { userStatus, userRoles } = require('../constants');
const { getUserByEmail, createUser } = require('./auth');

const {Op} = Sequelize;
async function getUserList(ctx) {
  const userList = await models.Users.findAll();
  ctx.body = { userList };
}

async function getUserDetails(ctx) {
  try {
    const {
      id, email, status, userInfo, createdAt, roleId, ...args
    } = await models.Users.findOne({ where: { id: ctx.params.id } });
    const { title: userRole } = await models.Role.findOne({ where: { id: +roleId } });

    ctx.body = {
      id,
      email,
      status,
      createdAt,
      role: userRole,
      ...userInfo,
    };
  } catch (error) {
    console.error(error.message);
  }
}

async function userCreate(ctx) {
  const {
    email,
    role,
    status,
    password,
    secretWord,
    age,
    name,
  } = ctx.request.body;
  if (!password || !email) {
    ctx.status = 400;
    ctx.body = {
      error: 'email and password are required!',
    };
  }
  const emailStr = email.toString();

  const userRole = await models.Role.findOne({ where: { title: userRoles.user }, raw: true });
  let enteredRole = null;
  if (role) {
    try {
      enteredRole = await models.Role.findOne({ where: { title: role.toString() }, raw: true });
    } catch (err) {
      console.error(`Role ${role} does not exist`);
    }
  }
  const userData = {
    email: emailStr,
    password: await bcrypt.hash(password, 8),
    secretWord: secretWord && await bcrypt.hash(secretWord, 10),
    status: userStatus.pending || userStatus[status],
    roleId: enteredRole ? enteredRole.id : userRole.id,
    userInfo: {
      age,
      name,
    },
  };
  const user = await getUserByEmail(emailStr);
  if (!user) {
    try {
      const newUser = await createUser(userData);
      ctx.status = 200;
      ctx.body = {
        message: 'success',
        newUserId: newUser.id,
      };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: 'Error in user creating process',
      };
    }
  } else {
    ctx.status = 406;
    ctx.body = {
      error: 'User with such email already exist',
    };
  }
}

async function userUpdate(ctx) {
  const user = await models.Users.findOne({ where: { id: +ctx.params.id } });
  const {
    email,
    role,
    status,
    password,
    secretWord,
    age,
    name,
  } = ctx.request.body;
  let enteredRole = null;

  if (role) {
    try {
      enteredRole = await models.Role.findOne({ where: { title: role.toString() }, raw: true });
      if (!enteredRole) {
        ctx.status = 400;
        ctx.body = {
          error: `Role ${role} foes not exist`,
        };
        return;
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: `Error with updating role ${err.toString()}`,
      };
      return;
    }
  }

  const userData = {
    email,
    password: password && await bcrypt.hash(password, 8),
    secretWord: secretWord && await bcrypt.hash(secretWord, 10),
    status: userStatus.pending || userStatus[status],
    roleId: role && enteredRole && enteredRole.id,
    userInfo: {
      age,
      name,
    },
  };

  const userByEmail = await models.Users.findOne({
    where: Sequelize.and(
      { email },
      {
        id: {
          [Op.not]: user.id,
        },
      },
    ),
    raw: true,
  });

  if (!userByEmail) {
    try {
      const newUser = await user.update(userData);
      ctx.status = 200;
      ctx.body = {
        message: 'success',
        id: newUser.id,
      };
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        error: `Error in user updating process ${err.toString()}`,
      };
    }
  } else {
    ctx.status = 406;
    ctx.body = {
      error: 'User with such email already exist',
    };
  }
}

async function userDelete(ctx) {
  const user = await models.Users.findOne({ where: { id: ctx.params.id } });
  await user.destroy();
  ctx.body = { deleted: true };
}

module.exports = {
  getUserList, getUserDetails, userCreate, userUpdate, userDelete,
};
