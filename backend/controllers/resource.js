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
      console.log('saved resource', resource);
      res.send(resource);
    })
    .catch((error) => {
      throw error;
    });
};

exports.handleCheckResource = (req, res) => {
  Resources.findOne({ where: { userId: req.body.userId, tutorialTitle: req.body.tutorialTitle } })
    .then(resource => {
      console.log('resource found', resource);
      res.send(resource);
    });
};
