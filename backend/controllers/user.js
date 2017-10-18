const User = require('../models/User');
const gitHubRepoCrawler = require('../utilities/gitHubRepoCrawler');

exports.handleUserFind = (req, res) => {
  User.findOne({ where: { userId: req.query.userId } }).then(user => {
    res.send(user);
  });
};

exports.handleUpdateUser = (req, res) => {
  User.findOne({ where: { userId: req.body.userId } })
    .then(user => {
      const newData = {
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName,
        email: req.body.email || user.email,
        githubUsername: req.body.githubUsername || user.githubUsername,
      };
      User.update(newData, { where: { userId: req.body.userId } })
        .then(result => {
          res.send(newData);
        })
        .catch(err => console.log('error updating user', err));
    })
    .catch(err => console.log('error updating user', err));
};
