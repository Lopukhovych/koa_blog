
module.exports = (sequelize, DataTypes) => {
  const GeneralInfo = sequelize.define('GeneralInfo', {
    title: DataTypes.STRING,
    info: DataTypes.TEXT,
  }, {
    freezeTableName: true,
  });
  GeneralInfo.associate = function (models) {
    // associations can be defined here
  };
  return GeneralInfo;
};
