// const express = require('express');
const router = require('express').Router();
const resume = require('../controllers/resume.js');
const userHandler = require('../controllers/userHandler');

router.post('/resume', resume.uploadHandler);
router.post('/signUp', userHandler.signUp);

module.exports = router;
