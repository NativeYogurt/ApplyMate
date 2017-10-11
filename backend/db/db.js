const Sequelize = require('sequelize');
const env = require('dotenv').config({ path: '../../.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => console.log('Connection to DB has been established successfully.'))
  .catch(err => console.log('Unable to connect to the database:', err));

module.exports = sequelize;
