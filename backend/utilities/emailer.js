import nodemailer from 'nodemailer';

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
    from: '"ApplyMate" <applymatebot@gmail.com>', // sender address
    to: 'jaffrepaul@gmail.com', // list of receivers
    subject: 'You have an interview! 🔥🔥', // Subject line
    text: 'You have an interview tomorrow!', // plain text body
    html: '<p>You have an interview tomorrow with [...].</p><p>Good luck!</p>💋<p>-ApplyMate</p>', // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
});
