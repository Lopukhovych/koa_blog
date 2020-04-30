const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const models = require('models/index');
const { userStatus} = require('src/constants');
const { createCustomUser } = require('src/services/user');
const {getUserByEmail} = require('src/services/email');

const {Op} = Sequelize;
async function getUserList(ctx) {
  const userList = await models.Users.findAll();
  ctx.body = { userList };
}

async function getUserDetails(ctx) {
  try {
    const {
      id, email, status, userInfo, createdAt, roleId,
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
    password,
    userData,
  } = ctx.request.body;

  console.log('userCreate: ');

  // TODO check token rights if not admin - response permission error

  if (!password || !email) {
    ctx.status = 400;
    ctx.body = {
      error: 'email and password are required!',
    };
    return;
  }

  const user = await getUserByEmail(email);
  if (!user) {
    try {
      const newUser = await createCustomUser({
        email, password, ...userData,
      });
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
