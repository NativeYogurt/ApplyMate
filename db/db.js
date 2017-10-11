const Sequelize = require('sequelize');

const sequelize = new Sequelize('applymate', 'nativeyogurt', 'nativeyogurt', {
  host: 'applymate.cuh8jnsx4027.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

module.exports = sequelize;
