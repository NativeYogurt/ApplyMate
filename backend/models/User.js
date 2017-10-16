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
  resume: {
    type: Sequelize.TEXT,
  },
  resumeURL: {
    type: Sequelize.STRING,
  },
  skills: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  githubUsername: {
    type: Sequelize.STRING,
  },
});

// User.sync();
module.exports = User;
