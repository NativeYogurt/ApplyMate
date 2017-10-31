const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN,
);

exports.TestTwilio = (recipient) => {
  return client.messages
    .createcreate({
      from: process.env.TWILIO_FROM,
      to: '+19174978029',
      body: 'TEST TEST BABYYYY',
    })
    .then(message => console.log(message))
    .catch(err => console.error(err));
};
