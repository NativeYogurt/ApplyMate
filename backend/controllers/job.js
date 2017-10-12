const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

const sequelize = require('../db/db.js');
const Users = require('../models/User.js');
const SavedJobs = require('../models/SavedJobs.js');

const Xray = require('x-ray');
const striptags = require('striptags');
const x = Xray();

exports.handleJobAdd = (req, res) => {
  console.log('req', req.body);
  let reqSkills = [];
  x(req.body.url, (['ol'],['ul'], ['li']))((err, data) => {
    reqSkills = data;
    const newJob = {
      company: req.body.company,
      jobTitle: req.body.jobTitle,
      description: req.body.description,
      url: req.body.url,
      skills: reqSkills,
      userId: req.body.userId,
    };
    SavedJobs
      .build(newJob)
      .save()
      .then((data) => {
        console.log('saved job', data);
        res.send(data);
      })
      .catch((error) => {
        throw error;
      });
  });


};
