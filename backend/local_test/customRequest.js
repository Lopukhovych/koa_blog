const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { userRoles } = require('../src/constants');

const modelsPath = path.join(path.dirname(__dirname), '/', 'models');
console.log('modelsPath: ', modelsPath);

const basename = path.basename(__filename);
const db = {};
//
const sequelize = new Sequelize('koa_first_db', 'koa', 'koa', {
  dialect: 'postgres',
  url: 'postgres://koa:koa@127.0.0.1:5432/koa_first_db',
  use_env_variable: 'url',
});

fs
  .readdirSync(modelsPath)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename)
    && (file !== 'index.js') && (file.slice(-3) === '.js'))
  .forEach((file, index) => {
    console.log(index, ' .file: ', file);
    const model = sequelize.import(path.join(modelsPath, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName, index) => {
  console.log(index, '. modelName: ', modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function getUserRoles() {
  // const user_list = await db.Role.findOne({ where: { title: userRoles.user }, raw: true });
  const roleList = await db.Role.findOne({
    where:
      Sequelize.or(
        { title: userRoles.user },
        { id: [7] },
      ),
    raw: true,
  });
  console.log('roleList: ', roleList.id);
  process.exit(-1);
}

getUserRoles();
// const userRole = async () => db.Role.findOne({ where: { title: userRoles.user }, raw: true });
// const volod = userRole();
//
// const userList = db.Role.findAll({raw: true});
