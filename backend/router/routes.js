// const express = require('express');
const router = require('express').Router();
const resume = require('../controllers/resume.js');
const userHandler = require('../controllers/userHandler');
const job = require('../controllers/job.js');
const comparison = require('../controllers/comparison.js');

router.post('/resume', resume.uploadHandler);
router.post('/signUp', userHandler.signUp);
router.post('/job', job.handleJobAdd);
router.get('/comparison', comparison.getComparison);

module.exports = router;
