const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User.js');

const SavedJobs = sequelize.define('saved_jobs', {
  job_id: {
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
  user_id: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'user_id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
});

SavedJobs.sync();
module.exports = SavedJobs;
