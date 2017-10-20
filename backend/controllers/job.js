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
          companyUrl: req.body.companyUrl,
          skills,
          userId: req.body.userId,
        };
        SavedJobs.findOne({
          where: {
            userId: req.body.userId,
            url: req.body.url,
            deleted: false,
          },
        })
          .then(existingJob => {
            if (existingJob !== null) {
              res.send(existingJob);
            } else {
              SavedJobs
                .build(newJob)
                .save()
                .then((job) => {
                  res.send(job);
                })
                .catch((newError) => {
                  throw newError;
                });
            }
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

exports.handleGetJob = (req, res) => {
  SavedJobs.findOne({
    where: {
      jobId: req.params.id,
    },
  })
    .then(job => {
      res.send(job);
    });
};

exports.handleEditJob = (req, res) => {
  SavedJobs.update({
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    status: req.body.status,
    dateApplied: req.body.dateApplied,
    url: req.body.url,
    companyUrl: req.body.companyUrl,
  }, {
    where: {
      jobId: req.params.id,
    },
  })
    .then(data => res.send(data))
    .catch(error => console.error(error));
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
