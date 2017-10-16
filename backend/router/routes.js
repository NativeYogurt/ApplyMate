// const express = require('express');
const router = require('express').Router();
const resume = require('../controllers/resume.js');
const userHandler = require('../controllers/userHandler');
const job = require('../controllers/job.js');
const user = require('../controllers/user');
const comparison = require('../controllers/comparison.js');

router.post('/resume', resume.uploadHandler);
router.post('/signUp', userHandler.signUp);
router.post('/scanForUser', userHandler.scanforUser);
router.post('/job', job.handleJobAdd);
router.get('/jobs', job.handleGetJobs);
router.get('/comparison', comparison.getComparison);
router.post('/findUser', user.handleUserFind);
router.put('/updateUser', user.handleUpdateUser);

module.exports = router;
