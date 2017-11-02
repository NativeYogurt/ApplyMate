const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

const sequelize = require('../db/db.js');
const Users = require('../models/User.js');
const SavedJobs = require('../models/SavedJobs.js');
const extract = require('../utilities/extractSkills.js');
const big5Scraper = require('../utilities/big5scraper.js');
const iFrameScraper = require('../utilities/iframeScraper.js');
const websiteChecker = require('../utilities/websiteChecker.js');

const Op = Sequelize.Op;

const Xray = require('x-ray');

const x = Xray();


const extractSkills = (data) => {
  if (data) {
    const text = data.join(' ');
    return extract.extractSkills(text);
  } else {
    return [];
  }
};

const addJobSkillsToDB = (skills, req, res) => {
  const newJob = {
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    status: req.body.status,
    dateApplied: req.body.dateApplied,
    location: req.body.location,
    url: req.body.url,
    companyUrl: req.body.companyUrl,
    skills,
    notes: req.body.notes,
    userId: req.body.userId,
  };
  SavedJobs.findOne({
    where: {
      userId: req.body.userId,
      url: req.body.url,
      deleted: false,
    },
  })
    .then(job => {
      if (job !== null) {
        res.send(job);
      } else {
        SavedJobs
          .build(newJob)
          .save()
          .then((job) => {
            websiteChecker.takePicture(job.url, true, job.jobId)
            res.send(job);
          })
          .catch((err) => {
            throw err;
          });
      }
    })
    .catch((error) => {
      throw error;
    });
};

//TODO OLD VERSON WILL DELETE AFTER NEW VERSION HAS BEEN TESTED OVER THE NEXT FEW DAYS

// exports.handleJobAdd = (req, res) => {
//   const big5 = ['amazon', 'google', 'microsoft', 'apple', 'facebook'];
//   const big5Check = big5.some(company => req.body.url.includes(company));
//   if (big5Check) {
//     big5Scraper.big5Scraper(req.body.url)
//       .then((data) => extractSkills(data))
//       .then((skills) => addJobSkillsToDB(skills, req, res))
//       .catch(e => console.error(e));
//   } else {
//     iFrameScraper.scrapeIframe(req.body.url)
//       .then((data) => {
//         return extractSkills(data);
//       })
//       .then((skills) => {
//         if (skills.length > 0) {
//           addJobSkillsToDB(skills, req, res);
//           return;
//         }
//         x(req.body.url, (['ol'], ['ul'], ['li']))((err, data) => {
//           extractSkills(data)
//             .then((xskills) => addJobSkillsToDB(xskills, req, res))
//             .catch(e => console.error(e));
//         });
//       })
//       .catch(e => console.error(e));
//   }
// };

exports.handleJobAdd = async (req, res) => {
  try {
    // let scrapeData = '';
    // let skills = '';
    // scrapeData = await big5Scraper.big5Scraper(req.body.url);
    // skills = await extractSkills(scrapeData);
    // if (skills) {
    //   await addJobSkillsToDB(skills, req, res);
    //   return;
    // }
    // scrapeData = await iFrameScraper.scrapeIframe(req.body.url);
    // skills = await extractSkills(scrapeData);
    // if (skills) {
    //   await addJobSkillsToDB(skills, req, res);
    //   return;
    // }
    x(req.body.url, (['ol'], ['ul'], ['li']))((err, data) => {
      extractSkills(data)
        .then(xskills => addJobSkillsToDB(xskills, req, res))
        .catch(e => console.error(e));
    });
  } catch (e) {
    console.error(e);
  }
};

exports.handleGetJobs = (req, res) => {
  SavedJobs.findAll({
    where: {
      userId: req.query.userId,
      deleted: false,
    },
  })
    .then(jobs => {
      res.send(jobs);
    });
};

exports.handleGetJob = (req, res) => {
  SavedJobs.findOne({
    where: {
      jobId: req.params.id,
    },
  })
    .then(job => {
      res.send(job);
    });
};

exports.handleEditJob = (req, res) => {
  SavedJobs.update({
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    status: req.body.status,
    dateApplied: req.body.dateApplied || null,
    location: req.body.location,
    url: req.body.url,
    companyUrl: req.body.companyUrl,
    notes: req.body.notes,
  }, {
    where: {
      jobId: req.params.id,
    },
  })
    .then(data => {
      res.send(data)
      SavedJobs.findOne({
        where: {
          jobId: req.params.id,
        },
      })
        .then(job => {
          websiteChecker.takePicture(job.url, true, job.jobId);
          return;
        });
    })
    .catch(error => console.error(error));
};

exports.handleJobDelete = (req, res) => {
  console.log('jobid', req.body.jobId);
  SavedJobs.update({
    deleted: true,
  }, {
    where: {
      jobId: req.body.jobId,
    },
  })
    .then(success => res.send('success'))
    .catch(error => console.error(error));
};

exports.handleJobFavorite = (req, res) => {
  SavedJobs.update({
    favorite: req.body.favoriteStatus,
  }, {
    where: {
      jobId: req.body.jobId,
    },
  })
    .then(success => res.send('success'))
    .catch(error => console.error(error));
};

exports.updateScreenshot = async (req, res) => {
  const jobId = req.body.jobId
  const jobUrl = await SavedJobs.findOne({
    attributes: ['url'],
    where: {
      jobId,
    },
  });
  const picture = await websiteChecker.takePicture(jobUrl.url, true, jobId);
  res.send('updated screenshot');
};
