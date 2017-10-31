const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

const sequelize = require('../db/db.js');
const Events = require('../models/Events.js');
const SavedJobs = require('../models/SavedJobs.js');

exports.handleEventAdd = (req, res) => {
  const newEvent = {
    eventType: req.body.eventType,
    eventDate: req.body.eventDate || null,
    eventTime: req.body.eventTime || null,
    eventParticipates: req.body.eventParticipates,
    jobId: req.body.jobId,
    userId: req.body.userId,
  };
  Events
    .build(newEvent)
    .save()
    .then((event) => {
      res.send(event);
    })
    .catch((error) => {
      throw error;
    });
};

exports.handleGetEvents = (req, res) => {
  Events.findAll({
    where: {
      jobId: req.query.jobId,
      deleted: false,
    },
  })
    .then(events => {
      res.send(events);
    });
};

exports.handleGetUserEvents = (req, res) => {
  console.log(req);
  Events.findAll({
    where: {
      userId: req.query.userId,
    },
  })
    .then(events => {
      res.send(events);
    });
};

exports.handleGetEvent = (req, res) => {
  Events.findOne({
    where: {
      eventId: req.params.id,
    },
  })
    .then(event => {
      res.send(event);
    });
};

exports.handleEditEvent = (req, res) => {
  Events.update({
    eventType: req.body.eventType,
    eventDate: req.body.eventDate || null,
    eventTime: req.body.eventTime || null,
    eventParticipates: req.body.eventParticipates,
  }, {
    where: {
      eventId: req.params.id,
    },
  })
    .then(data => res.send(data))
    .catch(error => console.error(error));
};

exports.handleEventDelete = (req, res) => {
  Events.update({
    deleted: true,
  }, {
    where: {
      eventId: req.body.eventId,
    },
  })
    .then(success => res.send('success'))
    .catch(error => console.error(error));
};
