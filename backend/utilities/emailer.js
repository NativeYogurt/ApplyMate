import nodemailer from 'nodemailer';

const emailer = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'applymatebot@gmail.com',
      pass: 'password1111',
    },
  });

  const mailOptions = {
    from: 'applymatebot@gmail.com',
    to: 'jaffrepaul@gmail.com',
    subject: 'Interview Reminder!',
    text: 'You have an interview tomorrow!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

exports.emailer = emailer;
