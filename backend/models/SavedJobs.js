const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');

const SavedJobs = sequelize.define('saved_jobs', {
  jobId: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  skills: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'userId',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
});

// builds table
SavedJobs.sync();

// drops, then builds table to account for errors
// SavedJobs.sync({ force: true }).then(() => {
//   // Table created
//   return SavedJobs.create({
//     jobId: 1,
//     skills: ['running', 'jumping'],
//     url: 'google.com',
//     userId: 5,
//   });
// });

module.exports = SavedJobs;
