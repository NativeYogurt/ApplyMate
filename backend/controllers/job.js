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
  console.log('req', req.body);
  let text;
  x(req.body.url, (['ol'], ['ul'], ['li']))((err, data) => {
    text = data.join(' ');
    extract.extractSkills(text)
      .then((skills) => {
        const newJob = {
          company: req.body.company,
          jobTitle: req.body.jobTitle,
          description: req.body.description,
          url: req.body.url,
          skills,
          userId: req.body.userId,
        };
        SavedJobs
          .build(newJob)
          .save()
          .then((job) => {
            console.log('saved job', job);
            res.send(job);
          })
          .catch((error) => {
            throw error;
          });
      });
  });
};

// exports.handleGetJobs = (req, res) => {
//   savedJobs.findOne({ where: { userId: req.body.userId } }).then(user => {
//     res.send(user);
//   });
// };
