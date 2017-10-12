const User = require('../models/User.js');

exports.signUp = (req, res) => {
  res.send('hey');
  User.create({
    userId: req.body.data.id,
    firstName: req.body.data.firstName,
    lastName: req.body.data.lastName,
    email: req.body.data.email,
  })
};
