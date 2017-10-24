const User = require('../models/User.js');
const gitHubRepoCrawler = require('../utilities/githubRepoCrawler')
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
  axios.get(`https://api.github.com/user/${req.body.data.uid}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`)
    .then((data) => {
      res.send(data.data.login)
    })
    .catch(err => {
      console.error(err)
    })
}
