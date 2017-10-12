// const express = require('express');
const router = require('express').Router();
const resume = require('../controllers/resume.js');
const userHandler = require('../controllers/userHandler');
const job = require('../controllers/job.js');

router.post('/resume', resume.uploadHandler);
router.post('/signUp', userHandler.signUp);
router.post('/job', job.handleJobAdd);

module.exports = router;
