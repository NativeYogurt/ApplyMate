const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

const sequelize = require('../db/db.js');
const Users = require('../models/User.js');
const SavedJobs = require('../models/SavedJobs.js');

exports.handleJobAdd = (req, res) => {
  console.log('req', req.body);
  SavedJobs
  .build(req.body)
  .save()
  .then((data) => {
    console.log('saved job', data);
  })
  .catch(error => {
    throw error;
  })
};

// module.exports = handleJobAdd;
const Xray = require('x-ray');
const striptags = require('striptags');
const x = Xray();

exports.uploadHandler = (req, res) => {
  x('https://jobs.jobvite.com/careers/ww-corporate/job/oI7X4fwA?__jvst=Job%20Board&__jvsd=Indeed', (['ol'],['ul'], ['li']))((err, data) => {
    //data = striptags(data)
    res.send(data);
  });
};
