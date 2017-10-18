const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

const sequelize = require('../db/db.js');
const Users = require('../models/User.js');
const SavedJobs = require('../models/SavedJobs.js');
const extract = require('../utilities/extractSkills.js');

const Xray = require('x-ray');

const x = Xray();

exports.handleJobAdd = (req, res) => {
  let text;
  x(req.body.url, (['ol'], ['ul'], ['li']))((err, data) => {
    text = data.join(' ');
    extract.extractSkills(text)
      .then((skills) => {
        const newJob = {
          company: req.body.company,
          jobTitle: req.body.jobTitle,
          status: req.body.status,
          dateApplied: req.body.dateApplied,
          url: req.body.url,
          skills,
          userId: req.body.userId,
        };
        SavedJobs
          .build(newJob)
          .save()
          .then((job) => {
            res.send(job);
          })
          .catch((error) => {
            throw error;
          });
      });
  });
};

exports.handleGetJobs = (req, res) => {
  SavedJobs.findAll({
    where: {
      userId: req.query.userId,
      deleted: false,
    },
  })
    .then(jobs => {
      res.send(jobs);
    });
};


exports.handleJobDelete = (req, res) => {
  SavedJobs.update({
    deleted: true,
  }, {
    where: {
      jobId: req.body.jobId,
    },
  })
    .then(success => res.send('success'))
    .catch(error => console.error(error));
};
