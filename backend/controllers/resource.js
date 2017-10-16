const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

const sequelize = require('../db/db.js');
const Users = require('../models/User.js');
const Resources = require('../models/Resources.js');

exports.handleResourceAdd = (req, res) => {
  const newResource = {
    relatedSkill: req.body.relatedSkill,
    tutorialType: req.body.tutorialType,
    tutorialTitle: req.body.tutorialTitle,
    tutorialLink: req.body.tutorialLink,
    videoThumbnail: req.body.videoThumbnail,
    videoDescription: req.body.videoDescription,
    userId: req.body.userId,
  };
  Resources
    .build(newResource)
    .save()
    .then((resource) => {
      res.send(resource);
    })
    .catch((error) => {
      throw error;
    });
};

exports.handleGetResources = (req, res) => {
  Resources.findAll({
    where: {
      userId: req.query.userId,
      deleted: false,
    },
  })
    .then(resources => {
      res.send(resources);
    });
};

exports.handleResourceDelete = (req, res) => {
  Resources.update({
    deleted: true,
  }, {
    where: {
      resourceId: req.body.resourceId,
    },
  })
    .then(success => res.send('success'))
    .catch(error => console.error(error));
};
