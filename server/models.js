const { DataTypes } = require('sequelize');
const db = require('./db');

const Session = db.define('session', {
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entrantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Session.sync();

module.exports = { Session };
