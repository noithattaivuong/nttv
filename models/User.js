// create user model
const Sequelize = require('sequelize');
const sequelize = require('../lib/db')
const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
    },

});

// create table with user model
User.sync()
    .then(() => console.log('User table created successfully'))
    .catch(err => console.log('User, did you enter wrong database credentials?'));

module.exports = User