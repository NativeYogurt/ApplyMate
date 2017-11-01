const nodemailer = require('nodemailer');
const axios = require('axios');
const Sequelize = require('sequelize');
const db = require('../db/db');
const Users = require('../models/User.js');
const Events = require('../models/Events');

exports.sendInterviewReminder = async () => {
  try {
    const date = new Date();
    const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    const events = await Events.findAll({ where: { eventDate: tomorrow } });
    const userIds = events.map((ele) => ele.userId);
    const users = await Users.findAll({ where: { userId: userIds } });
    const inspiration = [
      'Start small, think big. -Steve Jobs',
      'You are the wind beneath my wings. -Bette Midler',
      'Reach for the stars so if you fall...you land on the clouds. -Kayne',
      'Never compare your beginning to someone else’s middle. -Life Without Pants',
      'Slow is smooth...smooth is fast. -Navy SEALS',
      'Sky is the limit and you know that you can have what you want, be what you want. -Biggie Smalls',
    ];
    const randoInspiration = inspiration[Math.floor(Math.random() * inspiration.length)];

    users.forEach(user => {
      if (user.emailReminder && user.verifiedEmail) {
        const userObj = {
          firstName: user.firstName,
          githubName: user.githubUsername,
          email: user.email,
          inspiration: randoInspiration,
        };
        emailSender(userObj);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

const emailSender = (userObj, email) => {
  nodemailer.createTestAccount((err, account) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: '".apply(me)" <applymatebot@gmail.com>',
      to: userObj.email,
      subject: 'You have an interview! 🔥🔥',
      text: `Hey ${userObj.firstName || userObj.githubName}, You have an interview! have an interview tomorrow. Good luck! -ApplyMate`,
      html: `<p>Hey ${userObj.firstName || userObj.githubName},</p><p>You have an interview tomorrow.</p><p>Good luck!</p><p>Your friends @ApplyMate 👋</p><p><i>"${userObj.inspiration}"</i></p>`,
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
