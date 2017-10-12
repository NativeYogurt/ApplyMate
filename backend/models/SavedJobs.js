const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User.js');

const SavedJobs = sequelize.define('saved_jobs', {
  jobId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  company: {
    type: Sequelize.STRING,
  },
  jobTitle: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  skills: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
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

// SavedJobs.sync();
module.exports = SavedJobs;
