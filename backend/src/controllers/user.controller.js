const {
  createCustomUser,
  getAllUsers,
  getUserById,
  findUserFromJwt,
  checkGetUserPermissions,
  checkUserExistByEmail,
  updateCustomUser,
  getResponseUserInfo,
  deleteUser,
} = require('src/services/user.service');
const {setBadRequest} = require('src/middleware/exception.middleware');
const {auth, moderatorAuth} = require('src/middleware/auth.middleware');

async function getUserList(ctx) {
  try {
    await moderatorAuth(ctx);
    const users = await getAllUsers();
    ctx.body = { users };
  } catch (error) {
    console.error('Error_controller getUserList:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function getUserDetails(ctx) {
  try {
    const {authorization: token} = ctx.request.header;
    const { id } = ctx.params;
    await auth(ctx);

    const user = await findUserFromJwt(token);
    const requestedUser = await getUserById(id);
    await checkGetUserPermissions(user, requestedUser);

    ctx.status = 200;
    ctx.body = {user: requestedUser};
  } catch (error) {
    console.error('Error_controller getUserDetails:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function userCreate(ctx) {
  try {
    const {
      email, password, role, age, name, secretWord, status,
    } = ctx.request.body;

    await moderatorAuth(ctx);
    await checkUserExistByEmail(email);

    const user = await createCustomUser({
      email, password, role, age, name, secretWord, status,
    });
    const userInfo = await getResponseUserInfo(user);

    ctx.status = 200;
    ctx.body = {...userInfo};
  } catch (error) {
    console.error('Error_controller userCreate:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function userUpdate(ctx) {
  try {
    const {id} = ctx.params;
    const {
      email, role, status, password, secretWord, age, name,
    } = ctx.request.body;
    await moderatorAuth(ctx);
    await checkUserExistByEmail(email);

    const user = await getUserById(id);
    await updateCustomUser({
      email, role, status, password, secretWord, age, name,
    }, user);

    const updatedUserInfo = await getResponseUserInfo(user);

    ctx.status = 200;
    ctx.body = {
      ...updatedUserInfo,
    };
  } catch (error) {
    console.error('Error_controller userUpdate:', error.message);
    await setBadRequest(ctx, error);
  }
}

async function userDelete(ctx) {
  try {
    const {id} = ctx.params;
    await moderatorAuth(ctx);

    const user = await getUserById(id);

    await deleteUser(user);

    ctx.status = 200;
    ctx.body = { deleted: true };
  } catch (error) {
    console.error('Error_controller userDelete:', error.message);
    await setBadRequest(ctx, error);
  }
}

module.exports = {
  getUserList, getUserDetails, userCreate, userUpdate, userDelete,
};
