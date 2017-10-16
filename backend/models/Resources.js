const Sequelize = require('sequelize');
const sequelize = require('../db/db');
const User = require('./User');

const Resources = sequelize.define('resources', {
  resourceId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  relatedSkill: {
    type: Sequelize.STRING,
  },
  tutorialType: {
    type: Sequelize.STRING,
  },
  tutorialTitle: {
    type: Sequelize.STRING,
  },
  tutorialLink: {
    type: Sequelize.STRING,
  },
  videoThumbnail: {
    type: Sequelize.STRING,
  },
  videoDescription: {
    type: Sequelize.STRING,
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

Resources.sync();
module.exports = Resources;
