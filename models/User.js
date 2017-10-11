const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  user_id: {
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

module.exports = User;
