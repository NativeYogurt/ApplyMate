const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define('user', {
  userId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  skills: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
});

User.sync();
module.exports = User;
