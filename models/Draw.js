// create draw model
const Sequelize = require('sequelize');
const sequelize = require('../lib/db')
const Draw = sequelize.define('draw', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    username: {
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
Draw.sync()
    .then(() => console.log('Draw table created successfully'))
    .catch(err => console.log('Draw, did you enter wrong database credentials?'));

module.exports = Draw