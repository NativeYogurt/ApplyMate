const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const SavedJobs = require('./SavedJobs');
const User = require('./User');

const Events = sequelize.define('events', {
  eventId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventType: {
    type: Sequelize.STRING,
  },
  eventDate: {
    type: Sequelize.DATEONLY,
  },
  eventTime: {
    type: Sequelize.TIME,
  },
  eventParticipates: {
    type: Sequelize.STRING,
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

Events.sync();
module.exports = Events;
