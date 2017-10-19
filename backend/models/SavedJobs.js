const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');

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
  status: {
    type: Sequelize.STRING,
  },
  dateApplied: {
    type: Sequelize.DATEONLY,
  },
  url: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  skills: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
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
