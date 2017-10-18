const User = require('../models/User.js');
const gitHubRepoCrawler = require('../utilities/gitHubRepoCrawler')
const axios = require('axios');

exports.signUp = (req, res) => {
  User.create({
    userId: req.body.data.id,
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    email: req.body.data.email,
    githubUsername: req.body.data.githubUsername,
  })
    .then(DBUser => {
      if (DBUser.githubUsername) {
        gitHubRepoCrawler.getGithubInfoUser(DBUser.githubUsername);
      }
      res.send(DBUser);
    })
    .catch(err => console.error('New User Error', err));
};

exports.scanforUser = (req, res) => {
  User.findOne({ where: { email: req.body.data.email } })
    .then((user) => {
      res.send(user);
    });
};

exports.githubUidLookup = (req, res) => {
  console.log('githubuidlookupgotcalledbro')
  axios.get('https://api.github.com/user/30061836')
    .then((data) => {
      res.send(data.data.login)
    })
    .catch(err => {
      if (err === 'Error: Request failed with status code 403') alert(`Github API is congested right now, and we can't pull your user info. Please be patient.`)
      else alert(err)
    })
}