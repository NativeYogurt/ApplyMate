const User = require('../models/User.js');

exports.signUp = (req, res) => {
  res.send('hey');
  User.create({
    userId: req.body.data.id,
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    email: req.body.data.email,
    githubUsername: req.body.data.githubUsername,
  })
    .then(user => console.log('Created New User', user));
};

exports.scanforUser = (req, res) => {
  console.log('userhand', req.body.data.email);
  User.findOne({ where: { email: req.body.data.email } })
    .then((user) => {
      res.send(user);
    });
};
