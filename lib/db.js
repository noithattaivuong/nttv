const config = require('./config')

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    host: config.database.host,
    port: config.database.port,
    database: config.database.databaseName,
    username: config.database.username,
    password: config.database.password,
    dialect: config.database.type,
    dialectOptions: {
        connectTimeout: 20000, // default is 10s which causes occasional ETIMEDOUT errors (see https://stackoverflow.com/a/52465919/491553)
      },
    pool: {
        max: 10,
        min: 0,
        idle: 1 // Keep this very low or it'll make all Lambda requests take longer
      },
});

console

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize