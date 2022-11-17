const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres://katefeaster@127.0.0.1:5432/smash_perspective'
);

module.exports = sequelize;
