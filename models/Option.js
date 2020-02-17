// create draw model
const Sequelize = require('sequelize');
const sequelize = require('../lib/db')
const Option = sequelize.define('option', {
    ma: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    key: {
        type: Sequelize.STRING,
    },
    value: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.STRING,
    }
});

// create table with product model
Option.sync()
    .then(() => console.log('Option table created successfully'))
    .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = Option