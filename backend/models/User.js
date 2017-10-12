const Sequelize = require('sequelize');
const sequelize = require('../db/db');

const User = sequelize.define('users', {
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

// builds table
User.sync();

// drops, then builds table to account for errors
// User.sync({ force: true }).then(() => {
//   // Table created
//   return User.create({
//     userId: 5,
//     firstName: 'John',
//     lastName: 'Hancock',
//     email: 'jh@jh.com',
//     skills: ['running', 'jumping'],
//   });
// });

module.exports = User;
