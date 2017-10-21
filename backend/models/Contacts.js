const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const SavedJobs = require('./SavedJobs');

const Contacts = sequelize.define('contacts', {
  contactId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  jobTitle: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  linkedInProfile: {
    type: Sequelize.TEXT,
  },
  workPhone: {
    type: Sequelize.STRING,
  },
  personalPhone: {
    type: Sequelize.STRING,
  },
  howWeMet: {
    type: Sequelize.TEXT,
  },
  notes: {
    type: Sequelize.TEXT,
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
});

Contacts.sync();
module.exports = Contacts;
