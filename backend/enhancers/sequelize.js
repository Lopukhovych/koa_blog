
async function createEnhancer(Sequelize) {
  const {Model} = Sequelize;

  Model.prototype.getOptions = async function (options = []) {
    if (!options) {
      return this;
    }

    if (!options.length) {
      return this.dataValues;
    }

    return options.reduce((acc, attribute) => {
      acc[attribute] = this[attribute];
      return acc;
    }, {});
  };
}


module.exports = (sequelize) => [
  createEnhancer,
].reduce((obj, func) => func(obj), sequelize);
