const bcrypt = require('bcryptjs');

async function comparePassword(enteredPass, password) {
  return bcrypt.compare(enteredPass, password);
}

module.exports = {
  comparePassword,
};
