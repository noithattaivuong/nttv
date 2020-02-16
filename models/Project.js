// create product model
const Sequelize = require('sequelize');
const sequelize = require('../lib/db')
const Project = sequelize.define('project', {
    ma: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    link: {
        type: Sequelize.STRING,
    },
    detail: {
        type: Sequelize.TEXT,
    },
    description: {
        type: Sequelize.STRING,
    }
});

// create table with product model
Project.sync()
    .then(() => console.log('Project table created successfully'))
    .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = Project