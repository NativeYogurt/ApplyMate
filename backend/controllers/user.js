const User = require('../models/User');

exports.handleUserFind = (req, res) => {
  const id = req.body.id;
  console.log('userID in controller', req.body.userId);

  User.findOne({ where: { userId: req.body.userId } }).then(user => {
    res.send(user);
  });

  // gets all users as expected:
  // User.findAll().then(users => {
  //   res.send(users);
  // });
};
