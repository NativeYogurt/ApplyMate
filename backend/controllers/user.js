const User = require('../models/User');
const gitHubRepoCrawler = require('../utilities/githubRepoCrawler');

exports.handleUserFind = (req, res) => {
  User.findOne({ where: { userId: req.query.userId } }).then(user => {
    res.send(user);
  });
};

exports.handleUpdateUser = (req, res) => {
  let oldGithub;
  let newGithub;
  User.findOne({ where: { userId: req.body.userId } })
    .then(user => {
      oldGithub = user.githubUsername;
      newGithub = req.body.githubUsername;
      const newData = {
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName,
        email: req.body.email || user.email,
        githubUsername: req.body.githubUsername || user.githubUsername,
        emailReminder: req.body.emailReminder || user.emailReminder,
        verifiedEmail: req.body.verifiedEmail || user.verifiedEmail,
        phoneNumber: req.body.phoneNumber || user.phoneNumber,
        textReminder: req.body.textReminder || user.textReminder,
      };
      User.update(newData, { where: { userId: req.body.userId } })
        .then(result => {
          if (newGithub !== oldGithub) {
            gitHubRepoCrawler.getGithubInfoUser(newGithub);
          }
          res.send(newData);
        })
        .catch(err => console.log('error updating user', err));
    })
    .catch(err => console.log('error updating user', err));
};
