const axios = require('axios');
const db = require('../db/db');
const Users = require('../models/User.js');

const languages = {};

let username = 'alexanderlukens';

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

const scrapeLanguageData = (repos) => {
  const runs = repos.length;
  let totalRuns = 0;
  repos.forEach(repo => {
    axios.get(`${repo.languages_url}?client_id=850ff631aed1decba3ab&client_secret=b087ae7908e561afa19dbe1e061c7e6997aa4fc7`)
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
          sendLanguageDataToDB(username, languages)
        }
      });
  });
};

axios.get(`https://api.github.com/users/${username}/repos?client_id=850ff631aed1decba3ab&client_secret=b087ae7908e561afa19dbe1e061c7e6997aa4fc7`)
  .then(repos => scrapeLanguageData(repos.data))
  .catch(err => console.error(err));
