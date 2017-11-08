const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const SavedJobs = require('./SavedJobs');
const User = require('./User');

const Tasks = sequelize.define('tasks', {
  taskId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  taskDesc: {
    type: Sequelize.TEXT,
  },
  taskDueDate: {
    type: Sequelize.DATEONLY,
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  jobId: {
    type: Sequelize.INTEGER,
    references: {
      model: SavedJobs,
      key: 'jobId',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
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

Tasks.sync();
module.exports = Tasks;
