const nodemailer = require('nodemailer');
const axios = require('axios');
const Sequelize = require('sequelize');
const db = require('../db/db');
const Users = require('../models/User.js');

// query event table for interviews tomorrow
// should return array of objs
// iterate array & grab userId's off each obj
// use associated userId to pass into search user to get username, email etc

const getUserInfo = () => {
  axios.get('/activitiesByDate')
    // .then(axios.get('/findUser'))
    .then((result) => {
      const { data } = result;
      console.log(result);
    })
    .catch(err => console.log('error getting user data', err));
};

nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: '"ApplyMate" <applymatebot@gmail.com>',
    to: 'jaffrepaul@gmail.com',
    subject: 'You have an interview! 🔥🔥',
    text: 'You have an interview tomorrow. Good luck! -ApplyMate',
    html: '<p>You have an interview tomorrow with [...] @[...].</p><p>Good luck!</p><p>-ApplyMate</p>',
  };

  // send mail with defined transport object
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message sent: %s', info.messageId);
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  // });
});
