const {findOneUser} = require('src/resources/user');

async function getUserByEmail(email) {
  try {
    return findOneUser({email: email.toString()});
  } catch (error) {
    console.error('getUserByEmail error: ', error.message);
    return error;
  }
}

module.exports = {
  getUserByEmail,
};
