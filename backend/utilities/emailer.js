const nodemailer = require('nodemailer');
const axios = require('axios');
const Sequelize = require('sequelize');
const db = require('../db/db');
const Users = require('../models/User.js');
const Events = require('../models/Events');

const getUserByInterviewDate = async () => {
  try {
    const date = new Date();
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    const events = await Events.findAll({ where: { eventDate: tomorrow } });
    const userIds = events.map((ele) => ele.userId);
    const users = await Users.findAll({ where: { userId: userIds } });
    const emails = ['jaffrepaul@gmail.com', 'applymatebot@gmail.com']; // users.map(user => user.email);

    users.forEach(user => console.log(user.firstName));
    emails.forEach(email => emailSender(email));
  } catch (err) {
    console.error(err);
  }
};

const emailSender = (email) => {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '"ApplyMate" <applymatebot@gmail.com>',
      to: email,
      subject: 'You have an interview! 🔥🔥',
      text: 'You have an interview tomorrow. Good luck! -ApplyMate',
      html: '<p>You have an interview tomorrow with [...] @[...].</p><p>Good luck!</p><p>-ApplyMate</p>',
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
};
getUserByInterviewDate();
