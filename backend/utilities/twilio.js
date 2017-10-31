const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
);

const quotes =
[
  '-Fall seven times, stand up eight.',
  '-Never put off till tomorrow what you can do today.',
  '-Find out what you like doing best and get someone to pay you for doing it.',
  '-One important key to success is self-confidence. An important key to self-confidence is preparation.',
  '-Success consists of going from failure to failure without loss of enthusiasm.',
  '-Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy.',
  '-You miss 100% of the shots you don’t take.',
  '-Big jobs usually go to the men who prove their ability to outgrow small ones.',
  '-Do one thing every day that scares you.',
  '-Take risks: if you win, you will be happy; if you lose, you will be wise.',
  `-Opportunities don't often come along. So, when they do, you have to grab them.`,
  '-Never say anything about yourself you do not want to come true.',
  '-Choose a job you love, and you will never have to work a day in your life.',
  `-Success doesn't come to you, you go to it.`,
  '-Only those who dare to fail greatly can ever achieve greatly.',
  '-Never tell me the sky’s the limit when there are footprints on the moon.',
  '-It is never too late to be what you might have been.',
  '-All our dreams can come true, if we have the courage to pursue them.',
  '-Every experience in your life is being orchestrated to teach you something you need to know to move forward.',
  '-I’m a great believer in luck, and I find the harder I work, the more I have of it.',
  `-Whenever you are asked if you can do a job, tell 'em, 'Certainly I can!' Then get busy and find out how to do it.`,
];

exports.sendTwoHourReminderText = (recipient) => {
  return client.messages
    .create({
      from: process.env.TWILIO_FROM,
      to: '+13477815215',
      body: `Two hours before your interview! Good luck! ${quotes[Math.floor(Math.random() * quotes.length)]}` ,
    })
    .then(message => console.log(message))
    .catch(err => console.error(err));
};

