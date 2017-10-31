const axios = require('axios');
const Sequelize = require('sequelize');
const db = require('../db/db');
const Users = require('../models/User.js');

const Op = Sequelize.Op;

const sendLanguageDataToDB = (user, languageData) => {
  Users.update(
    {
      githubSkills: languageData,
    },
    {
      where: {
        githubUsername: user,
      },
    },
  )
    .then(() => console.log('complete'))
    .catch((err) => console.error(err));
};

const scrapeLanguageData = (repos, username) => {
  const runs = repos.length;
  const languages = {};
  let totalRuns = 0;
  repos.forEach(repo => {
    axios.get(`${repo.languages_url}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`)
      .then(data => {
        const languageData = data.data;
        Object.entries(languageData).forEach(kv => {
          const key = kv[0];
          const value = kv[1];
          languages[key] ? languages[key] += value : languages[key] = value;
        });
      })
      .then(() => {
        totalRuns += 1;
        if (runs === totalRuns) {
          sendLanguageDataToDB(username, languages);
        }
      });
  });
};

exports.cronGitHubUpdate = (req, res) => {
  Users.findAll({
    attributes: ['githubUsername'],
    where: {
      githubUsername: {
        [Op.ne]: '',
      },
    },
  })
    .then((data) => {
      const usernames = data.map(object => object.githubUsername);
      usernames.forEach((user) => this.getGithubInfoUser(user));
    });
};

exports.getGithubInfoUser = (username) => {
  axios.get(`https://api.github.com/users/${username}/repos?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`)
    .then(repos => scrapeLanguageData(repos.data, username))
    .catch(err => console.error(err));
};
