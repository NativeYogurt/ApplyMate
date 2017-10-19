const router = require('express').Router();
const resume = require('../controllers/resume.js');
const userHandler = require('../controllers/userHandler');
const job = require('../controllers/job.js');
const jobInfo = require('../controllers/jobInfo.js');
const user = require('../controllers/user');
const comparison = require('../controllers/comparison.js');
const resource = require('../controllers/resource.js');
// const github = require('../utilities/githubRepoCrawler.js');


router.post('/resume', resume.uploadHandler);
router.post('/signUp', userHandler.signUp);
router.post('/scanForUser', userHandler.scanforUser);
router.post('/githubUidLookup', userHandler.githubUidLookup);
router.post('/job', job.handleJobAdd);
router.put('/job/delete', job.handleJobDelete);
router.get('/jobs/:id', job.handleGetJob);
router.put('/jobs/:id', job.handleEditJob);
router.get('/jobs', job.handleGetJobs);
router.get('/comparison', comparison.getComparison);
router.get('/findUser', user.handleUserFind);
router.put('/updateUser', user.handleUpdateUser);
router.post('/resource', resource.handleResourceAdd);
router.get('/resource', resource.handleGetResources);
router.put('/resource/delete', resource.handleResourceDelete);
router.post('/BBB', jobInfo.BBB);


// router.get('/test', github.cronGitHubUpdate);

module.exports = router;
