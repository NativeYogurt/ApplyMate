// const express = require('express');
const router = require('express').Router();
const resume = require('../controllers/resume.js');

// const signupHandler = require('../controllers/signupHandler');
// const loginHandler = require('../controllers/loginHandler');
//
router.post('/resume', resume.uploadHandler);
//
// router.post('/login', loginHandler.handleLogin);

module.exports = router;
