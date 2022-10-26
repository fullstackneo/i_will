// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, './../.env'),
  debug: true
});

// create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });

module.exports = sequelize;
