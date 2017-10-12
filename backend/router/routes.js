// const express = require('express');
const router = require('express').Router();
const resume = require('../controllers/resume.js');
<<<<<<< HEAD
const userHandler = require('../controllers/userHandler');
const job = require('../controllers/job.js');

router.post('/resume', resume.uploadHandler);
router.post('/signUp', userHandler.signUp);
router.post('/job', job.handleJobAdd);
=======
const job = require('../controllers/job.js');
// const signupHandler = require('../controllers/signupHandler');
// const loginHandler = require('../controllers/loginHandler');
//
router.post('/resume', resume.uploadHandler);
//
router.post('/job', job.uploadHandler);
// router.post('/login', loginHandler.handleLogin);
>>>>>>> Add webscraper

module.exports = router;
