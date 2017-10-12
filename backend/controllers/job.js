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
