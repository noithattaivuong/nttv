// create admin model
const Sequelize = require('sequelize');
const sequelize = require('../lib/db')
const Admin = sequelize.define('admin', {
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
Admin.sync()
    .then(() => console.log('Admin table created successfully'))
    .catch(err => console.log('Admin, did you enter wrong database credentials?'));

module.exports = Admin