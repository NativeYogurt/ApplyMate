const User = require('../models/User.js');
const gitHubRepoCrawler = require('../utilities/gitHubRepoCrawler')

exports.signUp = (req, res) => {
  User.create({
    userId: req.body.data.id,
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    email: req.body.data.email,
    githubUsername: req.body.data.githubUsername,
  })
    .then(user => {
      if(user.githubUsername) {
        gitHubRepoCrawler.getGithubInfoUser(user.githubUsername);
      }
      res.send(user);
    });
};

exports.scanforUser = (req, res) => {
  console.log('userhand', req.body.data.email);
  User.findOne({ where: { email: req.body.data.email } })
    .then((user) => {
      res.send(user);
    });
};
