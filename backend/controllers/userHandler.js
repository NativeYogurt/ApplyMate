const User = require('../models/User.js');

exports.signUp = (req, res) => {
  res.send('hey');
  User.create({
    userId: req.body.data.id,
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    email: req.body.data.email,
  })
  .then(user => console.log('heyitssignup', user))
};
exports.scanforUser = (req, res) => {
  console.log('userhand', req.body.data.email);
  User.findAll({
    where: {
      email: req.body.data.email,
    },
  })
    .then((user) => {
      res.send(user);
      console.log('kenny', user);
    });
};
