// create product model
const DataTypes = require('../lib/datatypes');
const sequelize = require('../lib/db')
const Project = sequelize.define('project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING_UTF8
    },
    link: {
        type: DataTypes.STRING,
    },
    detail: {
        type: DataTypes.TEXT_UTF8
    },
    description: {
        type: DataTypes.TEXT_UTF8
    }
});

// create table with product model
Project.sync()
    .then(() => console.log('Project table created successfully'))
    .catch(err => console.log('oooh, did you enter wrong database credentials?'));

module.exports = Project